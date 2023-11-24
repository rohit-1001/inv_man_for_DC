import adwaitStyles from "./Picture.module.css";

import adwaitBackground from "../../assets/aboutUs.jpg";

const Picture = () => {
  return (
    <article className={adwaitStyles.adwaitArticle}>
      <picture className={adwaitStyles.adwaitPicture}>
        <source media="(min-width: 0px)" srcSet={adwaitBackground} />
        <img className="img123" src={adwaitBackground} alt="background" />
      </picture>
      <h1 className={adwaitStyles.adwaitHeader}>About Us</h1>
    </article>
  );
};

export default Picture;
