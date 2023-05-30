import { PluginData } from "@/types/tabs";
import { getLS, request, setLS } from "@/utils/helpers";

const init = async () => {
  const response = await fetch(
    "https://dataguard.blob.core.windows.net/challenges/plugins/fe-challenge.json"
  );
  const json = await response.json();
  Object.keys(json.data).forEach((key) => {
    if (localStorage.getItem(key) !== null) return;
    localStorage.setItem(key, JSON.stringify(json.data[key]));
  });

  const allDisabled = localStorage.getItem("allDisabled");
  if (allDisabled === null) {
    localStorage.setItem("allDisabled", "false");
  }
};

const getTabs = async () => {
  const tabs: string[] = await request(getLS, ["tabs"]);
  const tabData = await Promise.all(tabs.map((tab) => getTabData(tab)));
  return tabs.map((tab, index) => ({
    id: tab,
    title: tabData[index].title,
    icon: tabData[index].icon,
  }));
};

const getTabData = async (id: string) => {
  return request(getLS, ["tabdata", id]);
};

const getPluginData = async (id: string): Promise<PluginData> => {
  const reply = await request(getLS, ["plugins", id]);
  return {
    id,
    ...reply,
  };
};

const setTabData = async (id: string, data: any) => {
  await request(setLS, ["tabdata", id], data);
};

const setAllDisabled = async (value: boolean) => {
  await request(setLS, ["allDisabled"], value);
};

export const MockApi = {
  init,
  getTabs,
  getTabData,
  getPluginData,
  setTabData,
  setAllDisabled,
};
