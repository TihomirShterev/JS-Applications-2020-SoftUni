export function create(data) {
  return firebase.firestore().collection("items").add(data);
}
export function getAll() {
  return firebase.firestore().collection("items").get();
}
export function get(id) {
  return firebase.firestore().collection("items").doc(id).get();
}
export function erase(id) {
  return firebase.firestore().collection("items").doc(id).delete();
}
export function update(id, data) {
  return firebase.firestore().collection("items").doc(id).update(data);
}
