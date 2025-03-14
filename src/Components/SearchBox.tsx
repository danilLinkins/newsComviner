import { useState, useCallback } from 'react';
import SettingsModal from "./SettingsModal.tsx";
import FilterBox from "./FilterBox.tsx";
import useGlobalStore from "../Store";
import ThemeSwitch from "./ThemeSwitch.tsx";

function SearchBox() {
	const [searchValue, setSearchValue] = useState<string>("");
	const searchArticles = useGlobalStore().searchArticles;
	const setLoading = useGlobalStore(state => state.setLoading);

	const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setSearchValue(value);
		setLoading(true);
		debouncedSearch(value.split(' '));
	}

	function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
		let timeoutId: ReturnType<typeof setTimeout>;

		return (...args: Parameters<T>) => {
			if (timeoutId) clearTimeout(timeoutId);

			timeoutId = setTimeout(() => {
				func(...args);
			}, delay);
		};
	}

	const debouncedSearch = useCallback(debounce(searchArticles, 500), []);

	return (
		<div className="flex flex-col mb-10 filters-box">
			<div className="flex place-content-between mb-2">
				<label className="input w-full mr-2">
					<svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
					<input type="search" value={searchValue} onChange={handleChangeSearchValue} required placeholder="Search"/>
				</label>

				<label htmlFor="my_modal_7" className="btn">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
						<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
					</svg>
				</label>

				<SettingsModal/>
				<ThemeSwitch/>
			</div>

			<FilterBox/>
		</div>
	)
}

export default SearchBox;