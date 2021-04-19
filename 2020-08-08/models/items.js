// CRUD операции
// долните ф-ии са взети от тук: https://firebase.google.com/docs/web/setup#namespace
// да сменя items навсякъде според конкретната задача
export function create(data) {
  return firebase.firestore().collection("items").add(data);
}
export function getAll() {
  return firebase.firestore().collection("items").get();
}
export function get(id) {
  return firebase.firestore().collection("items").doc(id).get();
}
// изтриване - казва се erase по изключение, защото вече съществува вграден метод deletе
export function erase(id) {
  return firebase.firestore().collection("items").doc(id).delete();
}
// т.нар."edit"
export function update(id, data) {
  return firebase.firestore().collection("items").doc(id).update(data);
}
