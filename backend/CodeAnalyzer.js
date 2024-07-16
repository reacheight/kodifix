export default class CodeAnalyzer {
  analyze(rawCode) {
    const noParenthesisMatch = rawCode.match(/^ *(hero\.[^\d\W]\w*)$/mi)
    if (noParenthesisMatch) {
      return [
        {
          message: `Чтобы вызвать \'${noParenthesisMatch[0]}\', нужно добавить \'()\'.`,
          line: this.calculateLine(rawCode, noParenthesisMatch.index),
        }
      ]
    }

    const dashMatch = rawCode.match(/(hero.move-down)|(hero.move-up)|(hero.move-left)|(hero.move-right)|(find-nearest-enemy)/)
    if (dashMatch) {
      return [
        {
          message: `В методе \'${dashMatch[0]}\' должно быть \`_\` вместо \`-\`.`,
          line: this.calculateLine(rawCode, dashMatch.index),
        }
      ]
    }

    return [];
  }

  calculateLine(rawCode, matchIndex) {
    const lines = rawCode.split(/\r\n|\r|\n/);
    let indexCounter = 0;
    for (let i = 0; i < lines.length; i++) {
      indexCounter += lines[i].length;
      if (indexCounter > matchIndex)
        return i + 1;
    }
  }
}