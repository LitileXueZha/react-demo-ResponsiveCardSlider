export async function fakeRequest() {
  await new Promise(r=>setTimeout(r,1000));
  return 'ok';
}
