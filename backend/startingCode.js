const defaultStartingComment = `# пиши код ниже, чтобы управлять персонажем\n# нажми запуск, когда закончишь\n\n`;

export const startingCode = {
  [0]: defaultStartingComment,
  [1]: defaultStartingComment + "# продолжи код, чтобы добраться до финиша\nhero.move_right()\n",
  [2]: defaultStartingComment + "# напиши код, чтобы добраться до финиша\n# постарайся собрать все алмазы\n",
  [3]: "# используй метод с параметром,\n# чтобы пройти уровень одной строчкой\n",
  [4]: defaultStartingComment,
  [5]: `# используй метод switch, чтобы переключить мост\n\nhero.move_right(2)\nhero.switch("Напиши название рычага")\n\n# продолжи код, чтобы  добраться до финиша\n`,
  [6]: defaultStartingComment,
  [7]: `# используй метод attack, чтобы атаковать врага\n\n# дойти до врага John\nhero.move_left(5)\n\n# поменяй параметр метода,\n# чтобы атаковать врага John\nhero.attack("Имя врага")\n\n# продолжи код, чтобы добраться до финиша\n`,
  [8]: "",
  [9]: "",
};