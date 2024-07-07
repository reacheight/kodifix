export default class ErrorMessageMapper {
    static map(esperMessage) {
        if (esperMessage.startsWith("Unmatched `(`"))
            return "Нет закрывающей скобки `)`.";

        const noOpeningParantethisMatch = esperMessage.match(/If you want to call (`.*`) as function, you need `\(\)`'s/);
        if (noOpeningParantethisMatch) {
            return `Если ты хочешь вызвать метод ${noOpeningParantethisMatch[1]}, нужно добавить \`()\`.`;
        }

        const isNotAHeroMethodMatch = esperMessage.match(/(hero\..*) is not a function/)
        if (isNotAHeroMethodMatch) {
            return `Не существует метода \`${isNotAHeroMethodMatch[1]}\`. Смотри в список доступных команд.`;
        }

        const isNotDefinedMatch = esperMessage.match(/(.*) is not defined/)
        if (isNotDefinedMatch) {
            return `Не существует метода или переменной \`${isNotDefinedMatch[1]}\`. Проверь код на опечатки.`;
        }

        return esperMessage;
    }
}