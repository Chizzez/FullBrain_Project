import FBrainUsersDAOs from "../dao/fBrainUsersDAO.js";

export default class FBrainUsersController {
  static async apiGetFBrainUsers(req, res, next) {
    const FB_usersPerPage = req.query.FB_usersPerPage
      ? parseInt(req.query.FB_usersPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.Name) {
      filters.Name = req.query.Name;
    } else if (req.query.Email) {
      filters.Email = req.query.Email;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    const { FB_usersList, totalNumFB_users } =
      await FBrainUsersDAOs.getFBrainUsers({
        filters,
        page,
        FB_usersPerPage,
      });

    let response = {
      restaurants: FB_usersList,
      page: page,
      filters: filters,
      entries_per_page: FB_usersPerPage,
      total_results: totalNumFB_users,
    };
    res.json(response);
  }
}