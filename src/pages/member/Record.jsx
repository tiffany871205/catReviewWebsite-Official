import { NavLink, Outlet } from "react-router";

function Record() {
  return (
    <div className="member-tab-pane px-2 px-md-12 fade show active">
      <div className="record-container my-0 mx-auto">
        {/* 上方btn */}
        <ul className="nav nav-pills justify-content-between align-items-center mb-6">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link record-btn d-flex align-items-center ${isActive ? "active" : ""}`
              }
              to="comment"
              end
            >
              <i className="text-secondary-300 bi bi-chat-dots me-1"></i>
              <p className="text-neutral-900">留言評分</p>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link record-btn d-flex align-items-center ${isActive ? "active" : ""}`
              }
              to="favorite"
            >
              <i className="text-secondary-300 bi bi-bookmark me-1"></i>
              <p className="text-neutral-900">珍藏</p>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link record-btn d-flex align-items-center ${isActive ? "active" : ""}`
              }
              to="contribution"
            >
              <i className="text-secondary-300 bi bi-newspaper me-1"></i>
              <p className="text-neutral-900">投稿</p>
            </NavLink>
          </li>
        </ul>
        {/* 內容 */}
        <Outlet />
      </div>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam veritatis aliquam nesciunt
        fuga quae. Natus eius architecto, sed iusto fugiat iure similique laborum temporibus placeat
        maxime culpa dignissimos corrupti fugit. Harum, eius? Distinctio quod et corrupti
        voluptatum, architecto nam quaerat perferendis non voluptas ab minus placeat, tenetur illo
        nulla, perspiciatis similique! Perspiciatis, aut vero. Tempora mollitia velit repellendus
        vero dolore. At ex in, sit quos nostrum amet qui porro fugiat provident rem? Similique
        quaerat quasi nam, debitis commodi in! Voluptate quis obcaecati ut tempore explicabo
        molestiae alias consequatur porro ratione. Exercitationem libero placeat numquam sequi,
        cumque nam illo laboriosam assumenda odit deserunt, consequuntur saepe. Doloremque, dolorum
        odio. Quis, accusantium saepe unde rerum, laborum iusto facilis aut debitis commodi
        consequuntur officia? Totam cumque, debitis officiis molestiae minus aliquam atque nulla
        exercitationem iure nesciunt minima. Dicta ex excepturi saepe, nemo architecto ipsa
        perferendis ea ab consequatur temporibus asperiores officiis odio fugit id! Officiis
        incidunt, similique numquam animi nesciunt beatae fugit voluptas sequi nam sit, quas alias
        aut in ducimus aliquam quasi eius omnis molestiae rerum quos, dolor libero blanditiis.
        Deleniti, suscipit veritatis? Quis iure nobis aspernatur explicabo totam ipsa vitae veniam
        ipsam nam tempore possimus vel incidunt quaerat aliquid, harum natus, voluptatem, tempora
        fugit eligendi est! Tenetur placeat quidem fugit minus maxime. Voluptates, ipsum at!
        Repudiandae veritatis iste laudantium, ducimus accusamus quae possimus id sequi inventore,
        praesentium quis nulla suscipit natus error eveniet minus mollitia fugiat ipsum? Incidunt
        aliquid animi cum eum. Numquam, natus explicabo. Veniam sit ullam facere nam amet nesciunt
        enim obcaecati eum tenetur minus, a, dignissimos saepe, beatae perferendis odio explicabo?
        Voluptatum suscipit sit exercitationem delectus vel in magni! Itaque facilis consectetur
        fuga, similique eos ipsum! Laboriosam quod esse deserunt voluptates? Consectetur libero
        tempora fugit, minus dolore esse quam ullam error, vero doloribus mollitia quaerat eos
        veritatis ex quos?
      </p>
    </div>
  );
}

export default Record;
