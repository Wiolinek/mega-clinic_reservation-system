import { useEffect, useState } from 'react';
import Banner from "../Banner/Banner";
import GenericSection from "../GenericSection/GenericSection";
import List from "../List/List";
import { SpecialityType } from '../../types/speciality';



const Homepage: React.FC = () => {

    const [specialitiesData, setSpecialitiesData] = useState<SpecialityType[]>();
  
    useEffect(() => {
      fetch(`http://localhost:3030/specialities`)
      .then(response => response.json())
      .then(result => setSpecialitiesData(result))
      .catch(error => console.log(`error ${error}`))
    }, []);

    const content: React.ReactNode = <><h2>Dlaczego warto nam zaufać</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ab possimus animi dolore similique odio quis a tempora, modi aperiam eaque autem corrupti minima inventore minus temporibus facilis vitae rerum? Eaque ex, perferendis, laudantium minus, corrupti tenetur saepe cupiditate quasi magni eligendi dolor earum a repellendus vero nemo. Porro sunt repudiandae, explicabo recusandae praesentium quod corporis iste fugit dolorum dolores quaerat fugiat, natus soluta voluptate? Deserunt, quo autem nesciunt culpa quis nobis itaque. Architecto neque fugiat, obcaecati voluptate natus odit molestiae inventore accusantium voluptatem omnis reprehenderit dignissimos dolorum sequi repudiandae corrupti beatae dolore assumenda tenetur. Expedita corporis, deserunt aspernatur quod, minima itaque eveniet illo praesentium nihil quam magni molestiae amet sapiente laudantium et voluptate velit! Voluptatem rerum accusamus, quidem eius nemo laboriosam, amet ipsa quis, aliquid voluptas dolorum possimus eaque! Fugit, quibusdam eaque vitae cumque facilis odit nostrum reiciendis dicta, temporibus ullam suscipit rerum aperiam aliquam dolorem dignissimos nemo similique dolores optio, explicabo nulla libero quae in atque iusto. Dignissimos qui ex quasi vero expedita odit asperiores in vel nisi explicabo ipsa earum voluptatem, ipsum impedit laudantium unde? Ipsum tempora animi excepturi beatae dicta architecto adipisci perspiciatis maxime ad nobis asperiores cupiditate atque dolores recusandae officiis quasi reiciendis doloribus, nihil et. Nobis aliquid voluptatibus dolores! Impedit veritatis reiciendis iste accusamus optio quos reprehenderit omnis at. Magnam fugit, veritatis amet suscipit quam quos commodi eius nostrum vero temporibus aliquam autem, officia, accusantium assumenda? Omnis est laudantium corrupti, corporis repudiandae quaerat at dolore repellendus error quis nihil eveniet consequatur vero placeat facilis reprehenderit nostrum expedita qui ipsa facere perspiciatis officia dolorem illum! Repudiandae est aperiam temporibus debitis suscipit cupiditate deleniti ducimus exercitationem. Quia optio reprehenderit adipisci ab porro dolorum, velit consequatur sit facilis, vel excepturi qui voluptates ullam quidem eaque non! Nam deleniti esse iste iure aliquid necessitatibus totam eaque distinctio impedit? Officia cumque corrupti sint praesentium? Vero fugiat cumque exercitationem eum, perspiciatis illo a tempore aut, velit praesentium, maxime minus? Nobis aliquam mollitia repellendus nihil ullam quisquam necessitatibus quas alias blanditiis! Repellat, saepe aliquam doloremque mollitia minima cumque officia assumenda iure vel magni, soluta ipsam quibusdam numquam reiciendis. Incidunt odio minus exercitationem corrupti quis voluptates tempore praesentium labore adipisci! Et autem, ratione laudantium commodi tenetur error sint praesentium tempora, nulla, assumenda tempore eaque eos eius eveniet officiis cupiditate in aspernatur quae quia impedit. Aut explicabo dignissimos perferendis ducimus repellendus molestiae consequuntur assumenda esse voluptatibus, nam nisi quae tenetur deleniti totam iusto enim vitae similique ipsa, dolorem asperiores cumque dolor rem provident. </p></>

    const list = <List list={specialitiesData!} customClass='specialities'/>

    return (
        <main>
            <Banner />
            <GenericSection children={list}/>
            <GenericSection children={content}/>
        </main>
    )
}

export default Homepage;