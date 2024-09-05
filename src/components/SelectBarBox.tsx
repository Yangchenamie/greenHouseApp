import React, { useMemo, useState } from "react";
import { CalendarPicker, Dropdown } from "antd-mobile";
import _ from "../assets/utils";
import styled from "styled-components";

const SelectBarbox = styled.div`
  margin-top: 12px;
  .adm-dropdown-nav {
    width: 255px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 13px;
    font-size: 13px;
    .adm-dropdown-item {
      flex: auto;
    }
  }

  .analysisTarTitle {
    span {
      color: #56b790;
      margin-right: 5px;
    }
  }
`;

const house_data = [
  {
    id: 1,
    text: "1号大棚",
  },
  {
    id: 2,
    text: "2号大棚",
  },
  {
    id: 3,
    text: "3号大棚",
  },
];

const now = _.formatTime(null, "{0}{1}{2}");

const SelectBarBox = function SelectBarBox(): JSX.Element {
  let [visibled, setVisibled] = useState<boolean>(false),
    [selectDate, setSelectDate] = useState(now),
    [today, setToday] = useState(now);

  const slectTime = useMemo(() => {
    let [, year, month, day] = selectDate.match(/^(\d{4})(\d{2})(\d{2})$/);
    return {
      year,
      month,
      day,
    };
  }, [selectDate]);

  const select_time = [
    {
      key: "year",
      num: slectTime.year,
      text: "年",
    },
    {
      key: "month",
      num: +slectTime.month,
      text: "月",
    },
    {
      key: "day",
      num: +slectTime.day,
      text: "日",
    },
  ];

  /* 处理时间 */
  const time = useMemo(() => {
    let [, year, month, day] = today.match(/^(\d{4})(\d{2})(\d{2})$/);
    return {
      year,
      month,
      day,
    };
  }, [today]);

  const singleDate: Date = new Date(`${time.year}-${time.month}-${time.day}`);
  const min = new Date();
  min.setDate(-30);
  const max = new Date();
  max.setDate(time.day);

  return (
    <SelectBarbox>
      <Dropdown>
        <Dropdown.Item
          key="sorter"
          title={
            <div className="analysisTarTitle">
              <span>013</span>号大棚
            </div>
          }
          onClick={() => {
            setVisibled(false);
          }}
        >
          <div style={{ padding: 12 }}>
            {house_data.map((item) => {
              let { id, text } = item;
              return <div key={id}>{text}</div>;
            })}
          </div>
        </Dropdown.Item>
        {select_time.map((item) => {
          let { key, text, num } = item;
          return (
            <Dropdown.Item
              key={key}
              title={
                <div className="analysisTarTitle">
                  <span>{num}</span>
                  {text}
                </div>
              }
              onClick={() => {
                let flag = !visibled;
                setVisibled(flag);
              }}
            ></Dropdown.Item>
          );
        })}
      </Dropdown>
      <CalendarPicker
        min={min}
        max={max}
        visible={visibled}
        selectionMode="single"
        defaultValue={singleDate}
        onClose={() => setVisibled(false)}
        onMaskClick={() => setVisibled(false)}
        onConfirm={(val: Date | null) => {
          let flag = !visibled;
          setVisibled(flag);
          console.log(val);

          let date = _.formatTime(_.formatDateTime(val), "{0}{1}{2}");
          console.log(date);
          setSelectDate(date);
        }}
      />
    </SelectBarbox>
  );
};

export default SelectBarBox;
