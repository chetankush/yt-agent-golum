import { getTemporaryAccessToken } from '../../actions/getTemporaryAccess'
import SchematicEmbed from './SchematicEmbed'



const SchematicComponent = async ({componentId  }: {componentId: string}  ) => {
  if(!componentId) {
    return null;
  }

    //get access token

    const accessToken = await getTemporaryAccessToken();
    if (!accessToken) {
        throw new Error('No access token found')
    }
  
    return (          
    <div>
         <SchematicEmbed accessToken={accessToken} componentId={componentId} />
    </div>
  )
}

export default SchematicComponent
