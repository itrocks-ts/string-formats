import { ObjectOrType }            from '@itrocks/class-type'
import { toCssId }                 from '@itrocks/rename'
import { toField }                 from '@itrocks/rename'
import { tr }                      from '@itrocks/translate'
import { displayOf }               from '@itrocks/property-view'
import { EDIT }                    from '@itrocks/transformer'
import { HTML }                    from '@itrocks/transformer'
import { OUTPUT }                  from '@itrocks/transformer'
import { setPropertyTransformers } from '@itrocks/transformer'

const lfTab = '\n\t\t\t\t'

export function editMultiline<T extends object>(value: string, target: ObjectOrType<T>, property: keyof T)
{
	const fieldId    = toCssId(property)
	const fieldName  = toField(property)
	const label      = `<label for="${fieldId}">${tr(displayOf(target, property))}</label>`
	const input      = `<textarea id="${fieldId}" name="${fieldName}" type="multiline">${value}</textarea>`
	return label + lfTab + input
}

export function outputMultiline(value: string)
{
	return `<span class="multiline" style="white-space: pre-line;">${value}</span>`
}

export function setMultilineHtmlTransformers<T extends object>(target: ObjectOrType<T>, property: keyof T)
{
	setPropertyTransformers(target, property, [
		{ format: HTML, direction: EDIT,   transformer: editMultiline<T> },
		{ format: HTML, direction: OUTPUT, transformer: outputMultiline }
	])
}

export function setMultilineTransformers<T extends object>(target: ObjectOrType<T>, property: keyof T)
{
	setMultilineHtmlTransformers(target, property)
}
