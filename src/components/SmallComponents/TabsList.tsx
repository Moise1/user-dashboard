import React, { useState } from "react";
import TabButton from "./TabButton";
import {
  setTranslations,
  setDefaultLanguage,
  useTranslation,
} from "react-multi-lang";
import en from "../../translation.json";
setTranslations({ en });
setDefaultLanguage("en");
export default function TabsList() {
  const [active, setActive] = useState(1);
  const onChangeTab = (number: number) => {
    setActive(number);
  };
  const windowwidth = window.innerWidth;
  const t = useTranslation();
  return (
    <div className="row mx-auto my-3 d-blue align-items-center bg-white br-8 p-2">
      <TabButton
        onChangeTab={() => onChangeTab(1)}
        index={1}
        active={active}
        title={`${t("ac")}  ${windowwidth < 900 ? null : t("ls")} `}
      />

      <TabButton
        onChangeTab={() => onChangeTab(2)}
        index={2}
        active={active}
        title={`${t("pen")}  ${windowwidth < 900 ? "" : t("ls")} `}
      />
      <TabButton
        onChangeTab={() => onChangeTab(3)}
        index={3}
        active={active}
        title={`${t("ter")}   ${windowwidth < 900 ? "" : t("ls")} `}
      />
      <TabButton
        onChangeTab={() => onChangeTab(4)}
        index={4}
        active={active}
        title={`${t("imp")}   ${windowwidth < 900 ? "" : t("ls")} `}
      />
    </div>
  );
}
