import { useLazyGetSummaryQuery } from "../services/article";
import { useEffect, useState } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  useEffect(function () {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    articlesFromLocalStorage && setAllArticles(articlesFromLocalStorage);
  }, []);

  const [getSummary, { data, error, isFetching }] = useLazyGetSummaryQuery();
  async function handleSubmit(e) {
    e.preventDefault();

    const existArticle = allArticles.find((item) => item.url === article.url);
    if (existArticle) return setArticle(existArticle);
    const { data } = await getSummary({ articleUrl: article.url });

    if (!data.summary) return;
    const newArticle = { ...article, summary: data.summary };
    setArticle(newArticle);
    setAllArticles([newArticle, ...allArticles]);
    localStorage.setItem(
      "articles",
      JSON.stringify([newArticle, ...allArticles])
    );
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };
  return (
    <section className="demo">
      <div className="demo-form">
        <form onSubmit={handleSubmit}>
          <img src={linkIcon} alt="link-icon" />
          <input
            className="url_input peer"
            type="url"
            placeholder="enter a article URL"
            value={article.url}
            required
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
          />
          <button type="submit">
            <p>↵</p>
          </button>
        </form>

        <div className="search-history">
          {allArticles.map((item) => (
            <div key={item.url}>
              <img
                src={copied === item.url ? tick : copy}
                alt={copied === item.url ? "tick_icon" : "copy_icon"}
                onClick={() => handleCopy(item.url)}
              />
              <span>{item.url}</span>
            </div>
          ))}
        </div>
      </div>

      {isFetching ? (
        <img className="loader-image" src={loader} alt="loader_image" />
      ) : error ? (
        <p className="article-error">
          <span>Well, that was not supposed to happen...</span> <br />
          {error?.data?.error}
        </p>
      ) : (
        article.summary && (
          <div className="article-summary">{article.summary}</div>
        )
      )}
    </section>
  );
};

export default Demo;
