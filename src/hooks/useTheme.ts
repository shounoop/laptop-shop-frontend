import LocalStorageKey from '../shared/local-storage-key';
import { Theme } from '../shared/theme';
import { useLocalStorage } from './useLocalStorage';

export function useTheme() {
	return useLocalStorage<Theme>(LocalStorageKey.Theme, 'light');
}
