export default async function getPrice(mint: string) {
  const response = await fetch(
    `https://public-api.birdeye.so/public/price/?address=${mint}`
  );
  const json = await response.json();

  return json?.data?.value || 0;
}
