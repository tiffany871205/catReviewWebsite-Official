export default function FeedbackActions({ voteType, onUnhelpful, onHelpful }) {
  return (
    <div className="mb-12">
      <button
        type="button"
        className={`btn btn-feedback px-3 me-6 ${
          voteType === "unhelpful"
            ? "bg-danger text-white border-danger"
            : "text-neutral-700 bg-white"
        }`}
        onClick={onUnhelpful}
      >
        <img
          src="./images/knowledge/article/unhelpful.png"
          alt="unhelpful"
          className="pe-1"
          style={{
            filter:
              voteType === "unhelpful" ? "brightness(0) invert(1)" : "none",
          }}
        />
        {voteType === "unhelpful" ? "您覺得沒幫助" : "沒幫助"}
      </button>

      <button
        type="button"
        className={`btn btn-feedback px-3 ${
          voteType === "helpful"
            ? "bg-primary-600 text-white border-primary-600"
            : "text-neutral-700 bg-white"
        }`}
        onClick={onHelpful}
      >
        <img
          src="./images/knowledge/article/helpful.png"
          alt="helpful"
          className="pe-1"
          style={{
            filter: voteType === "helpful" ? "brightness(0) invert(1)" : "none",
          }}
        />
        {voteType === "helpful" ? "您覺得有幫助" : "有幫助"}
      </button>
    </div>
  );
}
