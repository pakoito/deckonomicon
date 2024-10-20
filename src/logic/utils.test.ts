import { shuffleArray } from "./utils";

test("adds 1 + 2 to equal 3", () => {
  expect(shuffleArray([1, 2, 3, 4, 5, 6, 7])).toBe(3);
});
