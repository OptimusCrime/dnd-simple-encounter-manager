export const showModal = (id: string): void => {
  const element = document.getElementById(id);
  if (element) {
    (element as HTMLDialogElement).showModal();
  }
};
export const hideModal = (id: string): void => {
  const element = document.getElementById(id);
  if (element) {
    (element as HTMLDialogElement).close();
  }
};
