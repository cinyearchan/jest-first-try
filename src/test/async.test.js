const {requestPromise, requestCallback} = require('../async/request')

test('异步callback方式检测', done => {
  // 下面进行了抛出了两次断言，在断言之前可以
  expect.assertions(1);
  function callback (data){
    expect(data).toStrictEqual({'id': 1, 'title': 'how to add', 'teacher': 'Miss Wang'})
    done()
  }

  requestCallback(callback,'lesson/1')
})

test('异步Promise方式检测', () => {
  expect.assertions(1);
  return requestPromise('exam').then(data => {
    expect(data).toStrictEqual({'name': 'primary school final exam'})
  })
})

test('异步Promise方式被成功resolve', () => {
  expect.assertions(1);
  return expect(requestPromise('exam')).resolves.toStrictEqual({'name': 'primary school final exam'})
})

// test('异步Promise方式被reject', () => {
//   expect.assertions(1);
//   return expect(requestPromise('exam')).rejects.toMatch('error')
// });

test('异步async/await方式检测', async() => {
  // 下面进行了抛出两次断言，在断言之前可以
  expect.assertions(2)
  
  const lesson1 = await requestPromise('lesson/1')
  const homework3 = await requestPromise('homework/3')

  expect(lesson1).toStrictEqual({'id': 1, 'title': 'how to add', 'teacher': 'Miss Wang'})
  expect(homework3).toMatchObject({'student': 'lucy'})
})