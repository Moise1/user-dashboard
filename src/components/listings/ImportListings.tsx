import { ConfirmBtn } from 'src/small-components/ActionBtns';
import Spreadsheet, { Matrix } from 'react-spreadsheet';
import { Button, Checkbox, Form } from 'antd';
import { useState } from 'react';
import '../../sass/listings.scss';
import { Channel } from 'src/redux/channels/channelsSlice';
import { useAppSelector } from 'src/custom-hooks/reduxCustomHooks';

const { Item } = Form;

export const ImportListings = () => {
  //Get channels and selected channel
  const { channels }: { channels: Channel[] } = useAppSelector((state) => state.channels);
  const selectedChannel = localStorage.getItem('channelId');
  const channel = channels.filter(function (data) {
    return data.id.toString() == selectedChannel;
  })[0];

  //Checkboxes modes

  const [variationMode, setVariationMode] = useState<boolean>(false);
  const [toRelist, setToRelist] = useState<boolean>(false);
  const [fromOtherPlatform, setFromOtherPlatform] = useState<boolean>(false);

  //Columns and data for the spreadsheet

  let columnsNames: string[];
  let [data] = useState<Matrix<{ value: string }>>([]);
  let skuName = channel.name + ' Identifier';

  if (channel.channelId === 4) {
    skuName = 'SKU';
  }

  //Conditions for the columns

  if (variationMode) {
    if (toRelist) {
      if (fromOtherPlatform) {
        columnsNames = [
          skuName,
          'Variation sku',
          'Variation attributes',
          'Source URL',
          'Source variation (optional)',
          'Source warehouse (optional)'
        ];
        data = [
          [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
          [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
          [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }]
        ];
      } else {
        columnsNames = [skuName, 'Variation sku', 'Variation attributes', 'Source URL'];
        data = [
          [{ value: '' }, { value: '' }, { value: '' }, { value: '' }],
          [{ value: '' }, { value: '' }, { value: '' }, { value: '' }],
          [{ value: '' }, { value: '' }, { value: '' }, { value: '' }]
        ];
      }
    } else {
      if (fromOtherPlatform) {
        columnsNames = [
          skuName,
          'Variation sku',
          'Variation attributes',
          'Source URL',
          'Source variation (optional)',
          'Source warehouse (optional)',
          'Markup (optional)'
        ];
        data = [
          [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
          [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
          [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }]
        ];
      } else {
        columnsNames = [skuName, 'Variation sku', 'Variation attributes', 'Source URL', 'Markup (optional)'];
        data = [
          [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
          [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
          [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }]
        ];
      }
    }
  } else {
    if (toRelist) {
      if (fromOtherPlatform) {
        columnsNames = [skuName, 'Source URL', 'Source variation (optional)', 'Source warehouse (optional)'];
        data = [
          [{ value: '' }, { value: '' }, { value: '' }, { value: '' }],
          [{ value: '' }, { value: '' }, { value: '' }, { value: '' }],
          [{ value: '' }, { value: '' }, { value: '' }, { value: '' }]
        ];
      } else {
        columnsNames = [skuName, 'Source URL'];
        data = [
          [{ value: '' }, { value: '' }],
          [{ value: '' }, { value: '' }],
          [{ value: '' }, { value: '' }]
        ];
      }
    } else {
      if (fromOtherPlatform) {
        columnsNames = [
          skuName,
          'Source URL',
          'Source variation (optional)',
          'Source warehouse (optional)',
          'Markup (optional)'
        ];
        data = [
          [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
          [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
          [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }]
        ];
      } else {
        columnsNames = [skuName, 'Source URL', 'Markup (optional)'];
        data = [
          [{ value: '' }, { value: '' }, { value: '' }],
          [{ value: '' }, { value: '' }, { value: '' }],
          [{ value: '' }, { value: '' }, { value: '' }]
        ];
      }
    }
  }

  return (
    <div className="import-listings">
      <div className="explanation-section">
        <p>You can add/import your existing listings in bulk by following these steps:</p>
        <ul>
          <li>Copy and paste your Item IDs ( which are the identifiers of your listings) in the column provided.</li>
          <li>
            Right next to it, in the Source URL column, you have to copy and paste the corresponding URLs for each
            listing (item ID).
          </li>
          <li>Once you have done that, you have to click on Monitor listings.</li>
        </ul>
        <p>
          As soon as your items are imported, HGR will start monitoring them. They will be imported with your current
          markup.
        </p>
        <p>
          If there is any issue with any of your listings, such as invalid URL or already existing listing, you will be
          informed after submitting your listings. You will see which of them have successfully been imported and which
          have not.
        </p>
      </div>

      <div className="checkboxes-section">
        <div className="checkboxes">
          <div className="variations-section">
            <Checkbox onChange={() => setVariationMode(!variationMode)}>Variations mode</Checkbox>
            {variationMode && (
              <div className="variations-mode-explanation">
                <p>If you wish to import variations, there are two more fields you will need to specify.</p>
              </div>
            )}
          </div>
          <div className="torelist-section">
            <Checkbox onChange={() => setToRelist(!toRelist)}>These listings are terminated, relist them</Checkbox>
            {toRelist && <div className="torelist-mode-explanation"></div>}
          </div>
          <div className="otherplatform-section">
            <Checkbox onChange={() => setFromOtherPlatform(!fromOtherPlatform)}>
              Import listings from another tool
            </Checkbox>
            {fromOtherPlatform && <div className="otherplatform-mode-explanation"></div>}
          </div>
        </div>
      </div>
      <Spreadsheet data={data} columnLabels={columnsNames} className="spreadsheet" />

      <Button>Add 10 rows</Button>
      <div className="table-container">
        <div className="button-container">
          <Item>
            <ConfirmBtn>List items</ConfirmBtn>
          </Item>
        </div>
      </div>
    </div>
  );
};
