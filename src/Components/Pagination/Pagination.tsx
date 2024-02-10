import React, { useState, useEffect, useContext } from "react";

import { MainContext } from "../../ReactDataTable/ReactDataTable";
import { PaginationType } from "../../Type/Type";
import './Pagination.css';

export default function Pagination({ pageCount, currentPage, pageNoHandler, next, previous, first, last }: PaginationType): React.JSX.Element {
	const mainContext = useContext(MainContext);
	const [pageNo, setPageNo] = useState<number[]>([]);
	const [rowPerPage, setRowPerPage] = useState<number>(mainContext.options?.rowsPerPage ? mainContext.options?.rowsPerPage : 10);

	const handleChengeRowPerPage = (value: number) => {
		setRowPerPage(value);
		pageNoHandler(currentPage, value);
	}

	useEffect(() => {
		let tempArray = []
		for (let i = 1; i <= pageCount; i++) {
			tempArray.push(i)
		}
		setPageNo([...tempArray])
	}, [pageCount])

	return (
		<>
			<div data-testid="rdt-pagination" className="rdtpagination">
				<div className='rdtpagination-pages' style={{ color: mainContext.options?.color?.color, backgroundColor: mainContext.options?.color?.backgroundColor, borderColor: mainContext.options?.color?.borderColor }}>
					{first && <input type="button" title={mainContext.options?.textLabels?.pagination?.first} className="rdtpagination-pages__no" value='<<' disabled={currentPage === 1} onClick={() => pageNoHandler(1, rowPerPage)} />}
					{previous && <input type="button" title={mainContext.options?.textLabels?.pagination?.previous} className="rdtpagination-pages__no" value='<' disabled={currentPage === 1} onClick={() => pageNoHandler(currentPage > 1 ? currentPage - 1 : currentPage, rowPerPage)} />}
					{pageNo.map(no =>
						<input key={no} type="button" className={currentPage === no ? 'rdtpagination-pages__no--select' : 'rdtpagination-pages__no'} value={no} onClick={() => pageNoHandler(no, rowPerPage)} />
					)}
					{next && <input type="button" title={mainContext.options?.textLabels?.pagination?.next} className="rdtpagination-pages__no" value='>' disabled={currentPage === pageNo.length} onClick={() => pageNoHandler(currentPage < pageCount ? currentPage + 1 : currentPage, rowPerPage)} />}
					{last && <input type="button" title={mainContext.options?.textLabels?.pagination?.last} className="rdtpagination-pages__no" value='>>' disabled={currentPage === pageNo.length} onClick={() => pageNoHandler(pageCount, rowPerPage)} />}
				</div>
				<div style={{ color: mainContext.options?.color?.color, backgroundColor: mainContext.options?.color?.backgroundColor, borderColor: mainContext.options?.color?.borderColor }}>
					<span>{mainContext.options?.textLabels?.pagination?.rowsPerPage}</span>
					<select className="rdtpagination-per-page" value={rowPerPage} onChange={event => handleChengeRowPerPage(Number(event.target.value))}>
						{
							mainContext.options?.rowsPerPageOptions?.map(number => (
								<option key={number} value={number}>{number}</option>
							))
						}
					</select>
				</div>
			</div>
		</>
	)
}