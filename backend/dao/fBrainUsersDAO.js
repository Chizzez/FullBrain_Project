

let FB_users

export default class FBrainUsersDAO {
    static async injection(conn) {
        if (restaurants) {
            return
        }
        try {
            FB_users = await conn.db(process.env.DASHBOARD_data).collection("FBrainUsers")
        } catch (e) {
            console.error(
                `Ùnable to establish a collection handle in FBrainUsersDAOs: ${e}`, 
            )
        }
    }

    static async getFBrainUsers({
        filters = null,
        page = 0,
        FB_usersPerPage = 20,
    }   = {}) {
        let query
        if (filters) {
            if("Name" in filters){
                query = { $text: { $search: filters["Name"] } }
            } else if ("Email" in filters) {
                query = { "Email": { $eq: filters["Email"] } }
            }
        }
        let cursor

        try{
            cursor = await FB_users
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return {FB_usersList: [], totalNumFB_users: 0}
        }

        const displayCursor = cursor.limit(FB_usersPerPage).skip(FB_usersPerPage * page)

        try {
            const FB_usersList = await displayCursor.toArray()
            const totalNumFB_users = await FB_users.countDocuments(query)
      
            return { FB_usersList, totalNumFB_users }
          } catch (e) {
            console.error(
              `Unable to convert cursor to array or problem counting documents, ${e}`,
            )
            return { FB_usersList: [], totalNumFB_users: 0 }
          }
    }

    
}