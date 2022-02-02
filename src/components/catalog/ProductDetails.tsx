import { Col, Row, Divider } from 'antd';
import { CancelBtn, WarningBtn } from '../small-components/ActionBtns';
import { t } from '../../global/transShim';

export const ProductDetails = () => {
  return (
    <div className="product-details">
      <Row gutter={[32, 0]}>
        <Col>
          <p>Image section</p>

        </Col>
        <Col>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim voluptas quos nam reiciendis nemo quaerat eius
            error, ducimus quod repudiandae quo placeat tempora ad ipsum. Reprehenderit eum saepe praesentium! Odio
            molestiae soluta voluptates, nesciunt id eos et voluptatibus asperiores placeat adipisci, minus molestias
            aut ipsa repellendus quos. Praesentium, eveniet? Dolore, explicabo id? Sit dicta iste ipsam voluptatem optio
            vero officia vitae placeat perferendis itaque nesciunt obcaecati corrupti tempore blanditiis praesentium
            incidunt ab, eum quidem cupiditate temporibus repellat voluptatibus id omnis. Repellat eaque consectetur,
            eos suscipit perferendis aspernatur incidunt eveniet fuga odit ea adipisci iure porro delectus! Ipsum
            necessitatibus qui dignissimos voluptate sapiente! Quis eos quam eligendi magnam tempore voluptate! Pariatur
            repudiandae blanditiis ut saepe adipisci doloribus, exercitationem neque animi, est culpa tempore corporis
            mollitia? Totam sunt soluta amet officiis nihil? Dolores odio quia perspiciatis ab repellat nulla, minus
            asperiores inventore necessitatibus quam laboriosam aliquid enim mollitia. Et sapiente ratione voluptates
            quis blanditiis exercitationem ab molestiae natus facilis, adipisci porro veritatis tempore voluptatem ullam
            aut facere eligendi. Sit impedit quae fuga hic culpa? Quos obcaecati esse voluptatum asperiores iusto minima
            sunt, aliquid fuga suscipit. Quibusdam ipsa aspernatur ratione neque qui repellendus harum assumenda odio,
            odit dicta tenetur possimus. Natus, odio ab?
          </p>
        </Col>
      </Row>
      <Divider />
      <div className="action-btns">
        <CancelBtn>{t('Dismiss')}</CancelBtn>
        <WarningBtn>{t('AddToSelection')}</WarningBtn>
      </div>
    </div>
  );
};
