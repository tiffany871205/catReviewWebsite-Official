import { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "react-router";
// import db from "../../db.json";
import db from "../../db.seed.json";
import Swal from "sweetalert2";
import ArticleBlock from "../components/articles/ArticleBlock";
import FeedbackActions from "../components/articles/FeedbackActions";
import CommentBox from "../components/articles/CommentBox";
import CommentItem from "../components/articles/CommentItem";
import BackToTopButton from "../components/articles/BackToTopButton";
import ArticleBreadcrumb from "../components/articles/ArticleBreadcrumb";
import {
  getKnowledgeArticleById,
  getKnowledgeArticleDetail,
  getKnowledgeComments,
  getKnowledgeMeta,
  createKnowledgeComment,
  updateKnowledgeComment,
  deleteKnowledgeComment,
  getKnowledgeFavByUserAndArticle,
  createKnowledgeFav,
  deleteKnowledgeFav,
} from "../api/knowledge";
import { timeAgo } from "../utils/timeAgo";
import { isAuthenticated } from "../utils/auth";

export default function Article() {
  const { id } = useParams();
  const articleId = Number(id);

  const [helpfulCount, setHelpfulCount] = useState(92);
  const [voteType, setVoteType] = useState(null);
  const [localComments, setLocalComments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [newCommentText, setNewCommentText] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);
  const [listItem, setListItem] = useState(null);
  const [detail, setDetail] = useState(null);
  const [topics, setTopics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const authUser = isAuthenticated();

  const currentUser = authUser
    ? {
        ...authUser,
        name: authUser.nickname,
        avatar: authUser.avatar || "./images/knowledge/article/user-1.png",
      }
    : null;

  // 提醒小框框
  const catAlert = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-primary-600 text-white mx-2",
      cancelButton: "btn btn-outline-secondary mx-2",
      popup: "rounded-4 border-0 shadow-lg",
      title: "fw-bold text-neutral-800",
    },
    buttonsStyling: false,
    confirmButtonColor: "#ffb11b",
  });

  // // 找列表資料
  useEffect(() => {
    async function fetchData() {
      try {
        const [article, articleDetail, comments, meta] = await Promise.all([
          getKnowledgeArticleById(articleId),
          getKnowledgeArticleDetail(articleId),
          getKnowledgeComments(articleId),
          getKnowledgeMeta(),
        ]);

        setListItem(article);
        setDetail(articleDetail);
        setLocalComments(comments);
        setTopics(meta.topics ?? []);
        setCategories(meta.categories ?? []);
        setVisibleCount(4);

        if (currentUser?.id) {
          const favList = await getKnowledgeFavByUserAndArticle(
            currentUser.id,
            articleId
          );

          if (favList.length > 0) {
            setIsBookmarked(true);
            setBookmarkId(favList[0].id);
          } else {
            setIsBookmarked(false);
            setBookmarkId(null);
          }
        } else {
          setIsBookmarked(false);
          setBookmarkId(null);
        }
      } catch (error) {
        console.error("取得文章資料失敗:", error);
      } finally {
        setLoading(false);
      }
    }

    if (Number.isFinite(articleId)) {
      fetchData();
    }
  }, [articleId, currentUser?.id]);

  const handleBookmarkToggle = async () => {
    if (!currentUser) {
      catAlert.fire({
        icon: "warning",
        title: "請先登入",
        text: "登入後才能收藏文章喔！",
        confirmButtonText: "我知道了",
        iconColor: "#ffb11b",
      });
      return;
    }

    try {
      if (isBookmarked && bookmarkId) {
        await deleteKnowledgeFav(bookmarkId);
        setIsBookmarked(false);
        setBookmarkId(null);

        Swal.fire({
          icon: "success",
          title: "已移除收藏",
          toast: true,
          position: "top-end",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        const existing = await getKnowledgeFavByUserAndArticle(
          currentUser.id,
          articleId
        );

        if (existing.length > 0) {
          setIsBookmarked(true);
          setBookmarkId(existing[0].id);
          return;
        }

        const created = await createKnowledgeFav({
          userId: currentUser.id,
          articleId,
          createdAt: new Date().toISOString(),
        });

        setIsBookmarked(true);
        setBookmarkId(created.id);

        Swal.fire({
          icon: "success",
          title: "已加入收藏",
          toast: true,
          position: "top-end",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("收藏操作失敗:", error);
    }
  };

  const visibleComments = useMemo(() => {
    return localComments.slice(0, visibleCount);
  }, [localComments, visibleCount]);

  // 麵包蟹
  const topicName = useMemo(() => {
    const tid = detail?.topicId ?? listItem?.topicId;
    if (!tid) return "";
    return topics.find((t) => t.id === tid)?.name ?? "";
  }, [topics, detail, listItem]);

  const categoryName = useMemo(() => {
    const cid = detail?.categoryId ?? listItem?.categoryId;
    if (!cid) return "";
    return categories.find((c) => c.id === cid)?.name ?? "";
  }, [categories, detail, listItem]);

  // meta
  const author = detail?.meta?.author || "Cool Meow";
  const publishDate = detail?.meta?.publishDate || listItem?.createdAt || "";

  // 「有幫助」按鈕
  const handleHelpfulClick = () => {
    if (voteType === "helpful") {
      setHelpfulCount((prev) => prev - 1);
      setVoteType(null);
      // setHasVoted(false);
    } else {
      Swal.fire({
        icon: "success",
        title: "感謝您的回饋！",
        text: "很高興這篇文章對您有幫助 🐾",
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });

      if (voteType === "unhelpful") {
        setHelpfulCount((prev) => Math.min(prev + 2, 100));
      } else {
        setHelpfulCount((prev) => Math.min(prev + 1, 100));
      }
      setVoteType("helpful");
    }
  };

  // 「沒幫助」按鈕
  const handleUnhelpfulClick = () => {
    if (voteType === "unhelpful") {
      setHelpfulCount((prev) => prev + 1);
      setVoteType(null);
    } else {
      Swal.fire({
        icon: "info",
        title: "收到了！",
        text: "我們會持續改進內容，謝謝您的意見。",
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });

      if (voteType === "helpful") {
        setHelpfulCount((prev) => Math.max(prev - 2, 0));
      } else {
        setHelpfulCount((prev) => Math.max(prev - 1, 0));
      }
      setVoteType("unhelpful");
    }
  };

  // 「分享」按鈕
  const handleShareClick = async () => {
    if (!detail) return;

    const shareData = {
      title: detail.title,
      text: `來看看這篇很有用的文章：${detail.title}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        Swal.fire({
          icon: "success",
          title: "網址已複製！",
          text: "快去分享給其他貓友吧 🐾",
          timer: 1500,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      }
    } catch (err) {
      console.log("分享取消或失敗", err);
    }
  };

  // 新增留言
  const handleAddComment = async () => {
    if (!currentUser) {
      catAlert.fire({
        icon: "warning",
        title: "請先登入",
        text: "登入後才能留言喔！",
        confirmButtonText: "我知道了",
        iconColor: "#ffb11b",
      });
      return;
    }
    if (!newCommentText.trim()) {
      catAlert.fire({
        icon: "warning",
        title: "喵？內容在哪裡？",
        text: "請輸入留言內容再送出喔！",
        confirmButtonText: "我知道了",
        iconColor: "#ffb11b",
      });
      return;
    }

    try {
      const created = await createKnowledgeComment({
        articleId,
        userId: currentUser.id,
        avatar: currentUser.avatar,
        name: currentUser.nickname,
        time: new Date().toISOString(),
        text: newCommentText,
      });

      setLocalComments((prev) => [created, ...prev]);
      setNewCommentText("");

      catAlert.fire({
        icon: "success",
        title: "留言成功！",
        text: "感謝你的分享 🐾",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("新增留言失敗:", error);
    }
  };

  // 修改留言
  const handleUpdateComment = async (commentId, newText) => {
    const targetComment = localComments.find((c) => c.id === commentId);

    if (
      !currentUser ||
      !targetComment ||
      targetComment.userId !== currentUser.id
    ) {
      catAlert.fire({
        icon: "error",
        title: "無法修改",
        text: "你只能修改自己的留言。",
      });
      return;
    }
    try {
      const updated = await updateKnowledgeComment(commentId, {
        text: newText,
      });

      setLocalComments((prev) =>
        prev.map((c) => (c.id === commentId ? updated : c))
      );
      catAlert.fire({
        icon: "success",
        title: "修改成功！",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("修改留言失敗:", error);
    }
  };

  // 刪除留言
  const handleDeleteComment = (commentId) => {
    const targetComment = localComments.find((c) => c.id === commentId);

    if (
      !currentUser ||
      !targetComment ||
      targetComment.userId !== currentUser.id
    ) {
      catAlert.fire({
        icon: "error",
        title: "無法刪除",
        text: "你只能刪除自己的留言。",
      });
      return;
    }
    catAlert
      .fire({
        title: "確定要移除這條留言？",
        text: "主子會想念這則評論的...",
        icon: "warning",
        iconColor: "#ff6b6b",
        showCancelButton: true,
        confirmButtonText: "確定刪除",
        cancelButtonText: "再留一下",
        background: "#fffaf5",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteKnowledgeComment(commentId);
            setLocalComments((prev) => prev.filter((c) => c.id !== commentId));
            catAlert.fire({
              title: "已成功移除",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
            });
          } catch (error) {
            console.error("刪除留言失敗:", error);
          }
        }
      });
  };

  if (loading) {
    return <div className="container py-5">載入中...</div>;
  }

  // 找不到文章
  if (!detail || !listItem) {
    return (
      <div className="section-2 pb-144 pt-md-12 bg-secondary-100">
        <div className="container container-style px-96">
          <div className="bg-white p-5 rounded">
            <h2 className="mb-3">找不到文章</h2>
            <p className="text-neutral-600 mb-4">
              文章不存在或網址 id 不正確。
            </p>
            <Link to="/knowledge" className="btn btn-primary-600 text-white">
              回到喵皇學堂
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* breadcrumb */}
      <ArticleBreadcrumb
        topicName={topicName}
        categoryName={categoryName}
        title={detail.title}
      />

      {/* section-2 */}
      <div className="section-2 pb-144 pt-md-12">
        <div className="container container-style px-96">
          <img
            src="./images/knowledge/article/Decoration-LT.png"
            alt="Decoration-LT"
            className="decoration-LT"
          />
          <img
            src="./images/knowledge/article/Decoration-RT.png"
            alt="Decoration-RT"
            className="decoration-RT"
          />

          <div className="col-12 head-content container">
            <div className="row knowledge-prod-header">
              {/* 桌面版標題 */}
              <div className="knowledge-text d-md-block d-none">
                <h1 className="mb-md-2">{detail.title}</h1>

                <div className="d-flex align-items-center mb-32">
                  <img
                    src="./images/knowledge/article/rwd-photo.png"
                    alt="author"
                    className="author-avatar-sm me-2"
                  />
                  <p className="mb-0 pt-0">
                    <span className="article-author">{author}</span>
                    {publishDate ? `・發佈時間 ${publishDate}` : ""}
                  </p>
                </div>

                <p className="article-meta-row d-flex justify-content-between align-items-center">
                  {" "}
                  <span>
                    <i
                      className={`bi ${
                        voteType === "helpful"
                          ? "bi-hand-thumbs-up-fill text-primary-700"
                          : "bi-hand-thumbs-up text-muted"
                      } pe-1`}
                    />
                    {helpfulCount}% 的讀者覺得這篇文章有幫助
                    <i className="bi bi-chat-dots ms-8"></i> 留言{" "}
                    {localComments.length}
                  </span>
                  <span>
                    <span
                      onClick={handleShareClick}
                      style={{ cursor: "pointer" }}
                      className="me-6"
                    >
                      <i className="bi bi-box-arrow-up-right me-1"></i>分享{" "}
                    </span>

                    <span
                      onClick={handleBookmarkToggle}
                      style={{ cursor: "pointer" }}
                    >
                      <i
                        className={`bi ${
                          isBookmarked
                            ? "bi-bookmark-fill text-primary-700"
                            : "bi-bookmark"
                        } me-1`}
                      ></i>
                      {isBookmarked ? "已收藏" : "加入收藏"}
                    </span>
                  </span>
                </p>
              </div>

              <div className="knowledge-pic">
                <img
                  src={detail.image}
                  alt={detail.title}
                  className="article-main-image mb-md-12 mb-0"
                />

                {/* 手機版標題 */}
                <div className="knowledge-text d-md-none d-block">
                  <h1 className="mb-1">{detail.title}</h1>

                  <div className="d-flex align-items-center mb-2">
                    <img
                      src="./images/knowledge/article/rwd-photo.png"
                      alt="author"
                      className="author-avatar-sm me-2"
                    />
                    <p className="mb-0">
                      <span className="article-author">{author}</span>
                      {publishDate ? `・發佈時間 ${publishDate}` : ""}
                    </p>
                  </div>

                  <p className="mb-3">
                    <i
                      className={`bi ${
                        voteType === "helpful"
                          ? "bi-hand-thumbs-up-fill text-primary-700"
                          : "bi-hand-thumbs-up text-muted"
                      } pe-1`}
                    />
                    {helpfulCount}% 的讀者覺得這篇文章有幫助
                  </p>

                  <div className="d-flex justify-content-between pb-11">
                    <p>
                      <i className="bi bi-chat-dots"></i> 留言{" "}
                      {localComments.length}
                    </p>
                    <p onClick={handleShareClick} style={{ cursor: "pointer" }}>
                      <i className="bi bi-box-arrow-up-right me-1"></i> 分享
                    </p>
                    <p
                      onClick={handleBookmarkToggle}
                      style={{ cursor: "pointer" }}
                    >
                      <i
                        className={`bi ${
                          isBookmarked
                            ? "bi-bookmark-fill text-primary-700"
                            : "bi-bookmark"
                        } me-1`}
                      ></i>
                      {isBookmarked ? "已收藏" : "加入收藏"}
                    </p>
                  </div>
                </div>

                {/* 文章*/}
                <div className="article-wrapper">
                  <div className="d-flex justify-content-center">
                    <div className="article-content">
                      {/* 副標題和介紹 */}
                      {detail.subtitle ? (
                        <p className="fw-bold text-neutral-900 mb-3">
                          {detail.subtitle}
                        </p>
                      ) : null}

                      {detail.intro ? (
                        <p className="mb-32">{detail.intro}</p>
                      ) : null}

                      <div className="food-type-list">
                        {(detail.blocks ?? []).map((b, idx) => (
                          <ArticleBlock
                            block={b}
                            index={idx}
                            key={b.id ?? idx}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* section-3 回饋和留言 */}
        <div
          className="container px-96 py-md-72"
          style={{
            backgroundImage:
              "url('./images/knowledge/article/section3_backgroundTextArea.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <section className="d-flex flex-column align-items-center text-center p-12">
            <h3 className="mb-6">專欄文章回饋滿意度回饋</h3>
            <hr className="my-4 opacity-10 w-100" />
            <p className="fw-bold text-neutral-600 py-6">
              這篇文章對你有幫助嗎？
            </p>

            <FeedbackActions
              voteType={voteType}
              onUnhelpful={handleUnhelpfulClick}
              onHelpful={handleHelpfulClick}
            />
          </section>

          <section className="comment-wrapper mx-auto py-5 pb-12">
            <h2 className="text-center mb-6">留言版分享區</h2>
            <hr className="my-4 opacity-10 mb-6" />

            {currentUser ? (
              <CommentBox
                currentUser={currentUser}
                newCommentText={newCommentText}
                setNewCommentText={setNewCommentText}
                onSubmit={handleAddComment}
              />
            ) : (
              <div className="text-center py-4">
                <p className="text-neutral-500 mb-0">請先登入後再留言</p>
              </div>
            )}

            {/* 動態渲染留言列表 */}
            {localComments.length > 0 ? (
              <>
                {visibleComments.map((c) => (
                  <CommentItem
                    key={c.id}
                    id={c.id}
                    avatar={c.avatar}
                    name={c.name}
                    time={timeAgo(c.time)}
                    text={c.text}
                    isAuthor={currentUser && c.userId === currentUser.id}
                    onDelete={handleDeleteComment}
                    onEdit={handleUpdateComment}
                  />
                ))}

                {/* 載入更多按鈕 */}
                {localComments.length > visibleCount && (
                  <div className="text-center mt-4">
                    <button
                      type="button"
                      className="btn btn-feedback text-neutral-700 py-1"
                      onClick={() => setVisibleCount((prev) => prev + 4)}
                    >
                      載入更多留言 ({localComments.length - visibleCount})
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-5">
                <p className="text-neutral-500">
                  目前還沒有留言，快來當第一個沙發吧！🐾
                </p>
              </div>
            )}
          </section>
        </div>
      </div>

      <BackToTopButton />
    </>
  );
}
