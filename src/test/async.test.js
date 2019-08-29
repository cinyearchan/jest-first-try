const { requestPromise, requestCallback } = require('../async/request')

// 在测试函数内提供一个 done，done 必须要被调用，才能算测试通过
test('异步callback方式检测', done => {
  // 下面进行了抛出了两次断言，在断言之前可以
  // 检验函数体内的断言跑了几次
  expect.assertions(1);
  function callback (data) {
    expect(data).toStrictEqual({ 'id': 1, 'title': 'how to add', 'teacher': 'Miss Wang' })
    done()
  }

  requestCallback(callback, 'lesson/1')
})

// 检验异步 Promise 时必须要用 return 返回
// 也可以使用 .resolve/.reject 形式
test('异步Promise方式检测', () => {
  expect.assertions(1);
  return requestPromise('exam').then(data => {
    expect(data).toStrictEqual({ 'name': 'primary school final exam' })
  })
})

test('异步Promise方式被成功resolve', () => {
  expect.assertions(1);
  return expect(requestPromise('exam')).resolves.toStrictEqual({ 'name': 'primary school final exam' })
})

// 如果需要检验 Promise 被 reject
// test('异步Promise方式被reject', () => {
//   expect.assertions(1);
//   return expect(requestPromise('exam')).rejects.toMatch('error')
// });

test('异步async/await方式检测', async () => {
  // 下面进行了抛出两次断言，在断言之前可以
  expect.assertions(2)

  const lesson1 = await requestPromise('lesson/1')
  const homework3 = await requestPromise('homework/3')

  expect(lesson1).toStrictEqual({ 'id': 1, 'title': 'how to add', 'teacher': 'Miss Wang' })
  expect(homework3).toMatchObject({ 'student': 'lucy' })
})