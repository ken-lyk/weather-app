import React from 'react';
import { convertDate } from '../Utilities/DateUtility';
import { useMediaQuery } from 'react-responsive';

const WeatherHistory = ({ historyData, onSelect, onDelete }) => {

    const isMobile = useMediaQuery({ query: '(max-width: 1028px)' })
    const renderHistoryItem = (item) => {
        let location = item?.city?.name ?? ''
        
        if(location !== '') {
            location = location + ', ' + item?.countryCode
        }
        else {
            location = item?.countryCode
        }
        
        return (
            <div className="flex justify-between items-center p-2 border-b border-gray-300 last:border-b-0">
                <p className="text-gray-800">{location}</p>
                <div className="flex items-center">
                    <p className="text-gray-800 items-right pr-2">{convertDate(item.created)}</p>
                    <button
                        className="bg-gray-300 rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-200"
                        onClick={() => onSelect(item.id)}
                    >
                        🔍
                    </button>
                    {historyData.length > 1 &&
                        <button
                            onClick={() => onDelete(item.id)}
                            className="bg-gray-300 rounded-full w-7 h-7 flex items-center justify-center ml-2 hover:bg-gray-200"
                        >
                            🗑
                        </button>
                    }
                </div>
            </div>
        )
    }

    const renderHistoryItemMobileView = (item) => {
        let location = item?.city?.name ?? ''

        if (location !== '') {
            location = location + ', ' + item?.countryCode
        }
        else {
            location = item?.countryCode
        }

        //item.created -> country / city search date
        return (
            <li
                key={item.index}
                className="bg-white/80 rounded-2xl p-4 mb-2 last:mb-0 flex items-center justify-between backdrop-blur-sm"
            >
                <div>
                    <div className="text-gray-800 font-medium">{location}</div>
                    <div className="text-gray-500 text-sm">{convertDate(item.created)}</div>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        className="bg-white/70 rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-sm hover:bg-gray-100 transition-colors"
                        onClick={() => onSelect(item.id)}
                    >
                        🔍
                    </button>
                    {historyData.length > 1 &&
                        <button className="bg-white/70 rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-sm hover:bg-gray-100 transition-colors"
                            onClick={() => onDelete(item.id)}
                        >
                            🗑
                        </button>
                    }
                </div>
            </li>
        )
    }

    const renderHistoryList = () => {
        if(historyData && historyData !== null) {
            let sortedHistories = historyData.sort((x, y) => new Date(y.created) - new Date(x.created))
            if(isMobile) {
                return (
                    <ul>
                        {sortedHistories.map(element => {
                            return renderHistoryItemMobileView(element)
                        })}
                    </ul>
                )
            }
            else {
                return sortedHistories.map(element => {
                    return renderHistoryItem(element)
                });
            }
            
        }
    }

    return (
        <div className="pt-4">
            <div className="bg-white/50 rounded-lg p-2">
                <h3 className="text-md font-semibold text-gray-800 mb-2 pl-2">Search History</h3>
                <div className="space-y-2">
                    {renderHistoryList()}
                </div>
            </div>
        </div>
    );
};


export default WeatherHistory;