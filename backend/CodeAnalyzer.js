export default class CodeAnalyzer {
  analyze(rawCode) {
    const lines = rawCode.split(/\r\n|\r|\n/);
    for (let i = 0; i < lines.length; i++) {
      const lineCode = lines[i];

      const noParenthesisMatch = lineCode.match(/^ *(hero\.[^\d\W]\w*)$/i);
      if (noParenthesisMatch) {
        return [
          {
            message: `Чтобы вызвать \`${noParenthesisMatch[0]}\`, нужно добавить \`()\`.`,
            line: i + 1,
          }
        ];
      }
  
      const dashMatch = lineCode.match(/(hero.move-down)|(hero.move-up)|(hero.move-left)|(hero.move-right)|(find-nearest-enemy)/)
      if (dashMatch) {
        return [
          {
            message: `В методе \`${dashMatch[0]}\` должно быть \`_\` вместо \`-\`.`,
            line: i + 1,
          }
        ];
      }
    }

    return [];
  }
}