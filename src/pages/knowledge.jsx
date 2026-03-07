import { Outlet, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useKnowledgeList from "../hooks/useKnowledgeList";
import useBootstrapPopovers from "../hooks/useBootstrapPopovers";
import db from "../../db.json";
import KnowledgeBanner from "../components/knowledges/KnowledgeBanner";
import MobileFilterBar from "../components/knowledges/MobileFilterBar";
import DesktopFilterSidebar from "../components/knowledges/DesktopFilterSidebar";
import Pagination from "../components/knowledges/Pagination";
import KnowledgeCard from "../components/knowledges/KnowledgeCard";

export default function Knowledge() {
  const [searchParams] = useSearchParams();

  const {
    paged,
    topics,
    currentCategories,
    keyword,
    selectedTopic,
    selectedCategory,
    page,
    totalPages,
    setKeyword,
    setSelectedTopic,
    setSelectedCategory,
    setPage,
    clear,
  } = useKnowledgeList(db, { pageSize: 9 });

  useBootstrapPopovers();

  useEffect(() => {
    const topic = searchParams.get("topic") || "";
    const category = searchParams.get("category") || "";

    setSelectedTopic(topic);
    setSelectedCategory(category);
    setPage(1);
  }, [searchParams, setSelectedTopic, setSelectedCategory, setPage]);

  const onBannerSubmit = () => setPage(1);

  return (
    <>
      <KnowledgeBanner
        keyword={keyword}
        setKeyword={setKeyword}
        onSubmit={onBannerSubmit}
      />

      <section className="bg-secondary-100 pt-lg-11 pb-0 pb-lg-12 pb-11">
        <MobileFilterBar
          keyword={keyword}
          setKeyword={setKeyword}
          topics={topics}
          categories={currentCategories}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onClear={clear}
        />

        <div className="container pt-0">
          <div className="row">
            <DesktopFilterSidebar
              keyword={keyword}
              setKeyword={setKeyword}
              topics={topics}
              categories={currentCategories}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            <div
              className="col-lg-9 col-12 d-flex flex-wrap 
              justify-content-lg-start justify-content-md-start justify-content-center"
            >
              {paged.map((a) => (
                <KnowledgeCard key={a.id} article={a} />
              ))}

              <div className="w-100">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  setPage={setPage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Outlet />
    </>
  );
}
