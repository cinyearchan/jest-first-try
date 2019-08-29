const {forEach} = require('../mock/index')

// 通过 jest.fn() 创建 Mock Function
const mockCallback = jest.fn(x => 42 + x);
// 将 mockCallback 代入 forEach 运行一次，即可记录下所有的值
forEach([0, 1], mockCallback);

test('记录mockCallback函数运行过程', () => {
  // mockCallback 上报函数运行了两次
  expect(mockCallback.mock.calls.length).toBe(2);

  // mockCallback 上报函数第一次运行的输入为 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // mockCallback 上报函数第二次运行的输入为 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // the return value of the first call to the function was 42
  // mockCallback 上报函数第一次运行的结果为 42
  expect(mockCallback.mock.results[0].value).toBe(42)
})