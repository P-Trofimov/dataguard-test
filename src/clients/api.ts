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
  // in a real app, we would make an actual request
  // here, we're just delaying LS interaction by 1 second
  const tabs = await request(getLSNested, ["tabs"]);
  console.log(tabs);
};

const getTabData = async (id: string) => {
  return request(getLSNested, ["tabdata", id]);
};

const getPlugins = async () => {
  return request(getLSNested, ["plugins"]);
};

export const MockApi = {
  init,
  getTabs,
  getTabData,
  getPlugins,
};
