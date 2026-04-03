import { ObjectOrType }      from '@itrocks/class-type'
import { decorate }          from '@itrocks/decorator/property'
import { DecorateCaller }    from '@itrocks/decorator/property'
import { decoratorOf }       from '@itrocks/decorator/property'
import { parameterProperty } from '@itrocks/decorator/property'

const MULTILINE = Symbol('multiline')

type Dependencies = {
	setTransformers?: <T extends object>(target: T, property: keyof T) => void
}

const depends: Dependencies = {
}

export function multilineDependsOn(dependencies: Partial<Dependencies>)
{
	Object.assign(depends, dependencies)
}

export function Multiline<T extends object>(value = true): DecorateCaller<T>
{
	const parent = decorate<T>(MULTILINE, value)
	return value
		? (target, property, index) => {
			const [targetObject, parameterName] = parameterProperty(target, property, index)
			depends.setTransformers?.(targetObject, parameterName)
			parent(target, property, index)
		}
		: parent
}

export function multilineOf<T extends object>(target: ObjectOrType<T>, property: keyof T)
{
	return decoratorOf(target, property, MULTILINE, false)
}
