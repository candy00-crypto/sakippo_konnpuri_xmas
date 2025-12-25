document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("passwordModal");
  const modalDialog = modal ? modal.querySelector(".modal-dialog") : null;
  const closeButton = document.getElementById("modalClose");
  const submitButton = document.getElementById("modalSubmit");
  const errorElement = document.getElementById("modalError");
  const inputs = Array.from(
    document.querySelectorAll(".modal-digit")
  );

  // ★ ここが正解の10桁パスワードです。好きな10桁の数字に変更してOKです。
  const CORRECT_PASSWORD = "1903458204";

  if (
    !modal ||
    !modalDialog ||
    !closeButton ||
    !submitButton ||
    !inputs.length
  ) {
    return;
  }

  function resetInputs() {
    inputs.forEach((input) => {
      input.value = "";
    });
    if (errorElement) {
      errorElement.textContent = "";
    }
  }

  function focusFirstInput() {
    if (inputs[0]) {
      inputs[0].focus();
    }
  }

  function closeModal() {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
  }

  function shakeWithMessage(message) {
    if (errorElement) {
      errorElement.textContent = message;
    }
    modalDialog.classList.remove("shake");
    void modalDialog.offsetWidth; // アニメーション再トリガー
    modalDialog.classList.add("shake");
  }

  // 入力補助：1文字入れたら次へ、Backspaceで前へ
  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      input.value = input.value.slice(0, 1);
      if (input.value && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        inputs[index - 1].focus();
      }
      if (e.key === "Enter") {
        handleSubmit();
      }
    });
  });

  function handleSubmit() {
    const code = inputs.map((i) => i.value).join("");

    if (code.length < inputs.length) {
      shakeWithMessage("10桁すべて入力してね。");
      return;
    }

    if (code === CORRECT_PASSWORD) {
      window.location.href =
        "https://note.com/saki_pochan/n/nb7a1fccdc5ea";
    } else {
      shakeWithMessage("パスワードが違います。");
    }
  }
  // ページ表示時に自動で入力欄を初期化＆フォーカス
  resetInputs();
  focusFirstInput();

  // モーダル内ボタン
  closeButton.addEventListener("click", () => {
    closeModal();
    resetInputs();
  });

  submitButton.addEventListener("click", handleSubmit);

  // モーダルの外側クリックで閉じる
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ESCキーで閉じる
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
});



