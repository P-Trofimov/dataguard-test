import { getLSNested, request } from "@/utils/helpers";

const init = async () => {
  const response = await fetch(
    "https://dataguard.blob.core.windows.net/challenges/plugins/fe-challenge.json"
  );
  const json = await response.json();
  Object.keys(json.data).forEach((key) => {
    if (localStorage.getItem(key) !== null) return;
    localStorage.setItem(key, JSON.stringify(json.data[key]));
  });
};

const getTabs = async () => {
  const tabs: string[] = await request(getLSNested, ["tabs"]);
  const tabData = await Promise.all(tabs.map((tab) => getTabData(tab)));
  return tabs.map((tab, index) => ({
    id: tab,
    title: tabData[index].title,
    icon: tabData[index].icon,
  }));
};

const getTabData = async (id: string) => {
  return request(getLSNested, ["tabdata", id]);
};

const getPluginData = async (id: string) => {
  return request(getLSNested, ["plugins", id]);
};

export const MockApi = {
  init,
  getTabs,
  getTabData,
  getPluginData,
};
