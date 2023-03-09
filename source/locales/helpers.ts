import { baseLocale } from './i18n-util';

import type { Namespaces, Translation, Translations } from './i18n-types';

/** Union of all namespaces or the wildcard `*` to represent the root. */
export type NamespaceOrRoot = Namespaces | '*';

/**  Resolves the translation of `NamespaceOrRoot`. */
export type NamespaceTranslation<T extends NamespaceOrRoot> =
  T extends Namespaces ? Translations[T] : Translation;

/**
 * Merges the default translation of a namespace with a given translation.
 * @note Use `*` as the namespace to merge the default translation of the root.
 */
export function mergeTranslations<
  S extends NamespaceOrRoot,
  T extends Partial<NamespaceTranslation<S>>
>(namespace: S, translation: T) {
  const baseLocaleTranslation =
    namespace === '*'
      ? require(`./${baseLocale}`).default
      : require(`./${baseLocale}/${namespace}`).default;

  return {
    ...baseLocaleTranslation,
    ...translation,
  } as T;
}
