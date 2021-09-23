import React from 'react';
import { Menu } from 'antd';
import { useTranslation } from 'react-multi-lang';
import HeaderDropDownItem from '../SmallComponents/HeaderDropDownItem';
import { Link } from 'react-router-dom';
import search_icon from '../../assets/search.svg';
import { PlusIcon } from '../common/Icons';

export default function DropDownMenu() {
  const t = useTranslation();
  return (
    <Menu className="drop-down_effect nav-dropdown border-0">
      <div>
        <div className="drop-down ">
          <div className="row mx-auto my-2 align-items-center">
            <div className="col-12">
              <div className="input-group drop-search-input  br-10 my-2 input-group-sm border  rounded pr-1 bg-white">
                <input
                  type="text"
                  className="form-control input-focus-none search_placeholder br-10 p-0 border-0"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Search..."
                />
                <span className="search-icon-input ">
                  <img src={search_icon} height="12" alt="" />
                </span>
              </div>
            </div>
            <div className="col-md-12"></div>
            <HeaderDropDownItem />
            <HeaderDropDownItem />
            <HeaderDropDownItem />

            <div className="col-md-12">
              <p className="fw-700">...</p>
            </div>
            <div className="col-md-12 mb-2 pl-2">
              <Link to="/newchannel">
                <div className="add-new-channel-drop">
                  <p className="mb-0">{t('AddNewChannel')}</p>
                  <PlusIcon />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Menu>
  );
}
