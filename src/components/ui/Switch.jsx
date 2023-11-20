import { useTranslation } from "react-i18next";

export const Switch = (props) => {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();

  const handleChangeLanguage = (newLanguage) => {
    changeLanguage(newLanguage);
  };

  return (
    <span className="flex items-center">
      {props.items.map((item, index) => (
        <span
          key={index}
          onClick={() => handleChangeLanguage(item.value)}
          className={`${
            index === 0 ? "rounded-l-full  border-primary" : ""
          } px-2 py-1 font-bold border-2 cursor-pointer ${
            index === props.items.length - 1
              ? "rounded-r-full border-primary"
              : ""
          } ${
            language === item.value
              ? "bg-primary text-white"
              : " text-white"
          } `}
        >
          {item.text}
        </span>
      ))}
    </span>
  );
};
