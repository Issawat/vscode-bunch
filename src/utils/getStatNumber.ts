export const getStatNumber = (
  result: string[],
  type: "insertion" | "deletion" | "file"
) => {
  const target = result.find((text) => text.includes(type));

  if (!target) {
    return 0;
  }

  const statNumber = Number(target.split(" ")[1]);

  return statNumber;
};
