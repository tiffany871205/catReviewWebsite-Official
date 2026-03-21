import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import Swal from "sweetalert2";
import {
  createFoodComment,
  createFoodFav,
  deleteFoodComment,
  deleteFoodFav,
  getFoodComments,
  getFoodDetailById,
  getFoodFavByUserAndFood,
  getFoodMeta,
  updateFoodComment,
} from "../../api/food";
import CommentBox from "../articles/CommentBox";
import CommentItem from "../articles/CommentItem";
import BackToTopButton from "../common/BackToTopButton";
import { timeAgo } from "../../utils/timeAgo";
import { isAuthenticated } from "../../utils/auth";

const decoration2 = `${import.meta.env.BASE_URL}images/food/Decoration2.png`;
const decorationLt = `${import.meta.env.BASE_URL}images/food/Decoration-LT.png`;
const decorationRt = `${import.meta.env.BASE_URL}images/food/Decoration-RT.png`;

function resolveFoodImagePath(imagePath) {
  if (!imagePath || typeof imagePath !== "string") {
    return null;
  }

  if (imagePath.startsWith("/images/food/")) {
    return `${import.meta.env.BASE_URL}${imagePath.slice(1)}`;
  }

  const fileName = imagePath.split("/").pop();
  if (!fileName) {
    return null;
  }

  return `${import.meta.env.BASE_URL}images/food/${encodeURIComponent(fileName)}`;
}

function buildLookupMap(items = []) {
  return new Map(items.map((item) => [item.id, item.name]));
}

function toPriceLabel(price) {
  return `NT$ ${Number(price ?? 0).toLocaleString("zh-TW")}`;
}

function formatFoodCommentTime(comment) {
  return timeAgo(comment?.updatedAt ?? comment?.createdAt ?? new Date().toISOString());
}

function getFoodCommentName(comment) {
  return comment?.name ?? comment?.userName ?? comment?.nickname ?? "匿名貓友";
}

function buildSections(detail, meta) {
  const ingredientMaps = {
    flavors: buildLookupMap(meta?.flavors),
    contentTypes: buildLookupMap(meta?.contentTypes),
    specialFormulas: buildLookupMap(meta?.specialFormulas),
    targets: buildLookupMap(meta?.targets),
  };

  const nutrition = detail?.nutrition ?? {};
  const ingredients = detail?.ingredients ?? {};
  const extraNutrition = detail?.extraNutrition ?? [];

  return [
    {
      title: "1. 基本資訊",
      items: [
        { label: "品牌", value: detail?.basicInfo?.brand ?? "-" },
        { label: "參考價格", value: toPriceLabel(detail?.price) },
        { label: "產地", value: detail?.basicInfo?.origin ?? "-" },
        { label: "重量", value: detail?.weight ?? "-" },
      ],
    },
    {
      title: "2. 成分描述",
      items: [
        { label: "口味類別", value: ingredientMaps.flavors.get(ingredients.flavorId) ?? "-" },
        {
          label: "內容物類別",
          value: ingredientMaps.contentTypes.get(ingredients.contentTypeId) ?? "-",
        },
        {
          label: "特殊配方",
          value: ingredientMaps.specialFormulas.get(ingredients.specialFormulaId) ?? "-",
        },
        { label: "適合年齡", value: ingredientMaps.targets.get(ingredients.targetId) ?? "-" },
      ],
    },
    {
      title: "3. 營養資訊",
      items: [
        { label: "水分比例", value: nutrition.moisture ?? "-" },
        { label: "熱量", value: nutrition.calories ?? "-" },
        { label: "脂肪比例", value: nutrition.fat ?? "-" },
        { label: "含膠與否", value: nutrition.containsGum ? "是" : "否" },
        { label: "蛋白質比例", value: nutrition.protein ?? "-" },
      ],
    },
    {
      title: "4. 額外成分",
      items: extraNutrition.map((item, index) => ({
        label: `額外成分${index + 1}`,
        value: `${item.name} ${item.value}`,
      })),
    },
  ];
}

function Section({ title, items, sectionIndex }) {
  const rows = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }

  return (
    <>
      <div className={`foodproduct-content pb-7 pt-md-72 ${sectionIndex > 0 ? "pt-md-72" : ""}`}>
        <h3>{title}</h3>
        <p className="product-border" />
      </div>

      {rows.map((row, rowIndex) => (
        <div className="d-md-flex" key={`${title}-${rowIndex}`}>
          {row.map((item, itemIndex) => (
            <div
              className={`col-md-6 d-flex pb-3 col-12 ${itemIndex === 0 ? "pe-48" : ""}`}
              key={`${item.label}-${item.value}`}
            >
              <img src={decoration2} alt="Decoration2" className="pe-3" />
              <div className="foodproduct-info ps-6 pt-2 pb-2">
                <p>{item.label}</p>
                <p className="p2">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default function FoodProductPage() {
  const { id } = useParams();
  const productId = Number(id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [product, setProduct] = useState(null);
  const [sections, setSections] = useState([]);
  const [localComments, setLocalComments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [newCommentText, setNewCommentText] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);
  const [isBookmarkSubmitting, setIsBookmarkSubmitting] = useState(false);

  const authUser = isAuthenticated();
  const currentUser = authUser
    ? {
        ...authUser,
        name: authUser.nickname,
        avatar: authUser.avatar || "./images/knowledge/article/user-1.png",
      }
    : null;

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

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);

        const [detail, meta, comments] = await Promise.all([
          getFoodDetailById(productId),
          getFoodMeta(),
          getFoodComments(productId),
        ]);

        const carouselImages = (detail?.images ?? [])
          .map((image) => resolveFoodImagePath(image))
          .filter(Boolean);

        if (!isMounted) return;

        setProduct({
          name: detail?.name ?? "未命名食品",
          author: detail?.meta?.author ?? "Cool Meow",
          publishDate: detail?.meta?.publishDate ?? "",
          carouselImages,
        });
        setSections(buildSections(detail, meta));
        setLocalComments(comments);
        setVisibleCount(4);

        if (currentUser?.id) {
          const favList = await getFoodFavByUserAndFood(currentUser.id, productId);

          if (!isMounted) return;

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

        setError("");
      } catch (error) {
        console.error("取得食品詳細資料失敗:", error);
        if (!isMounted) return;
        setProduct(null);
        setSections([]);
        setLocalComments([]);
        setIsBookmarked(false);
        setBookmarkId(null);
        setError(
          error.response?.status === 404
            ? "找不到這筆食品詳細資料。"
            : "食品詳細資料載入失敗，請確認 API 服務是否正常。"
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (!Number.isFinite(productId)) {
      setLoading(false);
      setError("食品 id 無效。");
      return;
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [productId, currentUser?.id]);

  const visibleComments = useMemo(() => {
    return localComments.slice(0, visibleCount);
  }, [localComments, visibleCount]);

  const handleShareClick = async () => {
    if (!product) return;

    const shareData = {
      title: product.name,
      text: `來看看這款貓咪食品：${product.name}`,
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
          text: "快去分享給其他貓友吧",
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

  const handleBookmarkToggle = async (event) => {
    event?.preventDefault();
    event?.stopPropagation();

    if (isBookmarkSubmitting) return;

    if (!currentUser) {
      catAlert.fire({
        icon: "warning",
        title: "請先登入",
        text: "登入後才能收藏食品喔！",
        confirmButtonText: "我知道了",
        iconColor: "#ffb11b",
      });
      return;
    }

    try {
      setIsBookmarkSubmitting(true);

      if (isBookmarked && bookmarkId) {
        await deleteFoodFav(bookmarkId);
        setIsBookmarked(false);
        setBookmarkId(null);

        await catAlert.fire({
          icon: "success",
          title: "已移除收藏",
          text: "這項食品已從收藏清單移除。",
          confirmButtonText: "我知道了",
          iconColor: "#ffb11b",
        });
      } else {
        const existing = await getFoodFavByUserAndFood(currentUser.id, productId);

        if (existing.length > 0) {
          setIsBookmarked(true);
          setBookmarkId(existing[0].id);
          await catAlert.fire({
            icon: "info",
            title: "已在收藏清單",
            text: "這項食品你已經收藏過囉。",
            confirmButtonText: "了解",
            iconColor: "#ffb11b",
          });
          return;
        }

        const created = await createFoodFav({
          userId: currentUser.id,
          foodId: productId,
          createdAt: new Date().toISOString(),
        });

        setIsBookmarked(true);
        setBookmarkId(created.id);

        await catAlert.fire({
          icon: "success",
          title: "已加入收藏",
          text: "已成功加入你的收藏清單。",
          confirmButtonText: "太好了",
          iconColor: "#ffb11b",
        });
      }
    } catch (error) {
      console.error("收藏操作失敗:", error);
      await catAlert.fire({
        icon: "error",
        title: "收藏失敗",
        text: "目前無法完成收藏操作，請稍後再試。",
        confirmButtonText: "我知道了",
      });
    } finally {
      setIsBookmarkSubmitting(false);
    }
  };

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
      const nowIso = new Date().toISOString();
      const created = await createFoodComment({
        foodId: productId,
        userId: currentUser.id,
        avatar: currentUser.avatar,
        name: currentUser.nickname,
        createdAt: nowIso,
        updatedAt: nowIso,
        content: newCommentText,
      });

      setLocalComments((prev) => [created, ...prev]);
      setNewCommentText("");

      catAlert.fire({
        icon: "success",
        title: "留言成功！",
        text: "感謝你的分享",
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

  const handleUpdateComment = async (commentId, newText) => {
    const targetComment = localComments.find((comment) => comment.id === commentId);

    if (!currentUser || !targetComment || targetComment.userId !== currentUser.id) {
      catAlert.fire({
        icon: "error",
        title: "無法修改",
        text: "你只能修改自己的留言。",
      });
      return;
    }

    try {
      const updated = await updateFoodComment(commentId, {
        content: newText,
        updatedAt: new Date().toISOString(),
      });

      setLocalComments((prev) =>
        prev.map((comment) => (comment.id === commentId ? updated : comment))
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

  const handleDeleteComment = (commentId) => {
    const targetComment = localComments.find((comment) => comment.id === commentId);

    if (!currentUser || !targetComment || targetComment.userId !== currentUser.id) {
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
        text: "這則分享會從清單中移除。",
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
            await deleteFoodComment(commentId);
            setLocalComments((prev) => prev.filter((comment) => comment.id !== commentId));
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

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <div className="container py-5">載入中...</div>;
  }

  if (error) {
    return <div className="container py-5 text-danger">{error}</div>;
  }

  if (!product) {
    return <div className="container py-5">找不到食品資料</div>;
  }

  return (
    <>
      <div className="section-1" id="top">
        <div className="container">
          <div className="row">
            <nav
              aria-label="breadcrumb"
              style={{ "--bs-breadcrumb-divider": "'>'" }}
              className="pt-3"
            >
              <ol className="breadcrumb">
                <li className="breadcrumb-item food-breadcrumb-item">
                  <Link to="/">首頁</Link>
                </li>
                <li className="breadcrumb-item food-breadcrumb-item">
                  <Link to="/food">膳食探索</Link>
                </li>
                <li className="breadcrumb-item food-breadcrumb-item active" aria-current="page">
                  {product.name}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="section-2 pb-144 pt-md-12">
        <div className="container container-style px-96">
          <img src={decorationLt} alt="Decoration-LT" className="decoration-LT" />
          <img src={decorationRt} alt="Decoration-RT" className="decoration-RT" />
          <div className="col-12 food-head-content">
            <div className="row food-prod-header">
              <div className="food-text">
                <h1>{product.name}</h1>
                <div className="d-flex align-items-center mb-32">
                  <img
                    src="./images/knowledge/article/rwd-photo.png"
                    alt="author"
                    className="author-avatar-sm me-2"
                  />
                  <p className="mb-0 pt-0">
                    <span className="article-author">{product.author}</span>
                    {product.publishDate ? `・發佈時間 ${product.publishDate}` : ""}
                  </p>
                </div>
                <p className="article-meta-row d-flex justify-content-between align-items-center">
                  <span>
                    <i className="bi bi-chat-dots me-1"></i> 留言 {localComments.length}
                  </span>
                  <span>
                    <span onClick={handleShareClick} style={{ cursor: "pointer" }} className="me-6">
                      <i className="bi bi-box-arrow-up-right me-1"></i>分享
                    </span>
                    <button
                      type="button"
                      onClick={handleBookmarkToggle}
                      className="btn p-0 border-0 bg-transparent"
                      disabled={isBookmarkSubmitting}
                      style={{ cursor: isBookmarkSubmitting ? "not-allowed" : "pointer" }}
                    >
                      <i
                        className={`bi ${
                          isBookmarked ? "bi-bookmark-fill text-primary-700" : "bi-bookmark"
                        } me-1`}
                      ></i>
                      {isBookmarked ? "已收藏" : "加入收藏"}
                    </button>
                  </span>
                </p>
              </div>

              <div className="food-pic">
                <div
                  id="carouselExampleControls"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {product.carouselImages.length > 0 ? (
                      product.carouselImages.map((image, index) => (
                        <div
                          className={`carousel-item ${index === 0 ? "active" : ""}`}
                          key={`carousel-${index + 1}`}
                        >
                          <div
                            className="d-flex justify-content-center align-items-center overflow-hidden bg-white rounded-3"
                            style={{ height: "640px" }}
                          >
                            <img
                              src={image}
                              alt={`food-img-${index + 1}`}
                              className="d-block w-100 h-100"
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="carousel-item active">
                        <div
                          className="d-flex justify-content-center align-items-center bg-white rounded-3"
                          style={{ height: "640px" }}
                        >
                          目前沒有圖片
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container food-detail-sections" style={{ backgroundColor: "#F4F1E9" }}>
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="row">
                {sections.map((section, index) => (
                  <Section
                    key={section.title}
                    title={section.title}
                    items={section.items}
                    sectionIndex={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="container px-96 py-md-72"
          style={{
            backgroundImage: "url('./images/knowledge/article/section3_backgroundTextArea.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <section className="comment-wrapper mx-auto py-5 pb-12 pt-md-12">
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

            {localComments.length > 0 ? (
              <>
                {visibleComments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    id={comment.id}
                    domId={`food-comment-${comment.id}`}
                    name={getFoodCommentName(comment)}
                    time={formatFoodCommentTime(comment)}
                    text={comment.content ?? comment.text ?? ""}
                    highlighted={false}
                    isAuthor={currentUser && comment.userId === currentUser.id}
                    onDelete={handleDeleteComment}
                    onEdit={handleUpdateComment}
                  />
                ))}

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
                <p className="text-neutral-500">目前還沒有留言，快來當第一個沙發吧！🐾</p>
              </div>
            )}
          </section>
        </div>
      </div>

      <BackToTopButton onClick={handleBackToTop} />
    </>
  );
}
