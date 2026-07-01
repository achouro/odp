const merge_sort = require("./merge_sort");

describe("merge_sort", () => {
  test("Empty is empty", () => {
    expect(merge_sort([])).toEqual([]);
  });

  test("Singleton is singleton", () => {
    expect(merge_sort([73])).toEqual([73]);
  });

  test("Sorted array as sorted array", () => {
    expect(merge_sort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  test("Unsorted array as sorted array", () => {
    expect(merge_sort([3, 2, 1, 13, 8, 5, 0, 1])).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
  });

  test("Unsorted array as sorted array II", () => {
    expect(merge_sort([105, 79, 100, 110])).toEqual([79, 100, 105, 110]);
  });
});