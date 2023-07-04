import GUI from "lil-gui";

/**
 * lil-gui管理用ファイル
 *
 * 概要：左上に表示されるパラメータ変更用GUIの管理
 */
let lilGUI: GUI | null = null;

function init() {
  lilGUI = new GUI();
}

function add(callback: (gui: GUI) => void) {
  if (lilGUI) {
    callback(lilGUI);
  }
}

const gui = {
  init,
  add,
};

export { gui };
