import { logosummify } from "../assets";

const Hero = () => {
  return (
    <section className="hero">
      <header className="header">
        <div className="logo">
          <img src={logosummify} />

          <span>Summify</span>
        </div>
      </header>
      <main className="hero-main">
        <h1>
          Summarize Articles With <br /> <span>OpenAI GPT-4</span>
        </h1>
        <h4>
          Summarize any article with Summify, an article summarizer that
          transforms lengthy articles into clear and concise summaries.
        </h4>
      </main>
    </section>
  );
};

export default Hero;
