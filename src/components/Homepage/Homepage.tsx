import { useEffect, useState } from 'react';
import Banner from '../Banner/Banner';
import GenericSection from '../GenericSection/GenericSection';
import List from '../List/List';
import { SpecialityType } from '../../types/speciality';


const Homepage: React.FC = () => {
    const [specialitiesData, setSpecialitiesData] = useState<SpecialityType[]>();
  
    useEffect(() => {
      fetch(`http://localhost:3030/specialities`)
      .then(res => res.json())
      .then(result => setSpecialitiesData(result))
      .catch(error => console.log(`error ${error}`))
    }, []);

    const content: React.ReactNode = <>
        <h2>Dlaczego warto nam zaufać</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ab possimus animi dolore similique odio quis a tempora, modi aperiam eaque autem corrupti minima inventore minus temporibus facilis vitae rerum? Eaque ex, perferendis, laudantium minus, corrupti tenetur saepe cupiditate quasi magni eligendi dolor earum a repellendus vero nemo. Porro sunt repudiandae, explicabo recusandae praesentium quod corporis iste fugit dolorum dolores quaerat fugiat, natus soluta voluptate? Deserunt, quo autem nesciunt culpa quis nobis itaque.</p>
        <p>Fugit, quibusdam eaque vitae cumque facilis odit nostrum reiciendis dicta, temporibus ullam suscipit rerum aperiam aliquam dolorem dignissimos nemo similique dolores optio, explicabo nulla libero quae in atque iusto. Dignissimos qui ex quasi vero expedita odit asperiores in vel nisi explicabo ipsa earum voluptatem, ipsum impedit laudantium unde? Ipsum tempora animi excepturi beatae dicta architecto adipisci perspiciatis maxime ad nobis asperiores cupiditate atque dolores recusandae officiis quasi reiciendis doloribus, nihil et. Nobis aliquid voluptatibus dolores!</p>
        <p>Repudiandae est aperiam temporibus debitis suscipit cupiditate deleniti ducimus exercitationem. Quia optio reprehenderit adipisci ab porro dolorum, velit consequatur sit facilis, vel excepturi qui voluptates ullam quidem eaque non! Nam deleniti esse iste iure aliquid necessitatibus totam eaque distinctio impedit? Officia cumque corrupti sint praesentium? Vero fugiat cumque exercitationem eum, perspiciatis illo a tempore aut, velit praesentium, maxime minus? Nobis aliquam mollitia repellendus nihil ullam quisquam necessitatibus quas alias blanditiis!</p>
    </>

    const list = <List list={specialitiesData!} customClass='specialities'/>

    
    return (
        <main>
            <Banner />
            <GenericSection children={list}/>
            <GenericSection children={content} customClass='article__section'/>
        </main>
    )
}

export default Homepage;