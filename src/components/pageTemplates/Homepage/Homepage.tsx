import { useContext } from 'react';
import { MyContext } from 'Context';
import Banner from 'components/common/Banner/Banner';
import GenericSection from 'components/common/GenericSection/GenericSection';
import List from 'components/List/List';
import Loader from 'components/Loader/Loader';
import { SpecialitiesType } from 'types/speciality';
import { ArticleType } from 'types/article';
import useFetch from 'helpers/useFetch';


const Homepage: React.FC = () => {
    const { labels, language } = useContext(MyContext);

    const specialitiesData: SpecialitiesType = useFetch(`${process.env.REACT_APP_SITE_HOST}/api/specialities`, 'GET');
    
    const articleData: ArticleType = useFetch(`${process.env.REACT_APP_SITE_HOST}/api/articles`, 'POST', { page: 'homepage', language }, language);

    
    return (
        <main>
            <Banner />
            <GenericSection>
            {
                (specialitiesData.loading && !specialitiesData.data) &&
                    <Loader message={labels?.loaders.list} />
            }
            {
                (!specialitiesData.loading && specialitiesData.data) &&
                    <List customClass='specialities'
                        list={specialitiesData?.data}
                    />
            }
            </GenericSection>
            <GenericSection customClass='article__section'>
                {
                    (!articleData?.loading && Array.isArray(articleData?.data)) &&
                        articleData.data.map(text => 
                        <>
                            <h2>{text?.title}</h2>
                            <p>{text?.content}</p>
                        </>)
                    }
            </GenericSection>
        </main>
    )
}

export default Homepage;