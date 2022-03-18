import { createSignal, JSXElement } from "solid-js";

export const [modalContent, setModalContent] = createSignal<JSXElement>();

export const showModal = (content: JSXElement) => {
  setModalContent(content);
};

export const closeModal = () => {
  setModalContent(undefined);
};
