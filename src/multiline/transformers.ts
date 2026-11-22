import { ObjectOrType }            from '@itrocks/class-type'
import { controlField }            from '@itrocks/form-controls'
import { ControlScope }            from '@itrocks/form-controls'
import { multilineControl }        from '@itrocks/form-controls'
import { EDIT }                    from '@itrocks/transformer'
import { HTML }                    from '@itrocks/transformer'
import { OUTPUT }                  from '@itrocks/transformer'
import { setPropertyTransformers } from '@itrocks/transformer'

export function editMultiline<T extends object>(
	value: string, target: ObjectOrType<T>, property: keyof T, scope?: ControlScope
) {
	return multilineControl(value, controlField(target, property, scope))
}

export function outputMultiline(value: string)
{
	return (value === '') ? '' : `<span class="multiline" style="white-space: pre-line;">${value}</span>`
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
