export default class CodeAnalyzer {
  analyze(rawCode) {
    const noParenthesisMatch = rawCode.match(/^ *(hero\.[^\d\W]\w*)$/mi)

    if (!noParenthesisMatch)
      return [];

    return [
      {
        message: `Чтобы вызвать \'${noParenthesisMatch[0]}\', нужно добавить \'()\'`,
        start: noParenthesisMatch.index,
        end: noParenthesisMatch.index + noParenthesisMatch[0].length
      }
    ]
  }
}