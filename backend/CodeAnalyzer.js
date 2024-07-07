export default class CodeAnalyzer {
  analyze(rawCode) {
    const noParenthesisMatch = rawCode.match(/^ *(hero\.[^\d\W]\w*)$/mi)
    if (noParenthesisMatch) {
      return [
        {
          message: `Чтобы вызвать \'${noParenthesisMatch[0]}\', нужно добавить \'()\'.`,
        }
      ]
    }

    const dashMatch = rawCode.match(/(hero.move-down)|(hero.move-up)|(hero.move-left)|(hero.move-right)|(find-nearest-enemy)/)
    if (dashMatch) {
      return [
        {
          message: `В методе \'${dashMatch[0]}\' должно быть \`_\` вместо \`-\`.`,
        }
      ]
    }

    return [];
  }
}