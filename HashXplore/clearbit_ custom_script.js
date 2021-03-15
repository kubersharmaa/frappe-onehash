// Kuber: Clearbit HashXplore

var HashXplore = 'HashXplore';
var fillEmail = "Kindly fill Valid Email"; //If Email is not filled
var saveForm = "Save the form first"; //If the form is not saved
var _404 = "Data Not Found";

function hashXplore(frm) {
    frappe.call({
        method: 'hashXplore?email=' + frm.doc.email_id,
        btn: $('.primary-action'),
        freeze: true,
        callback: (d) => {
            if (!d.exc && d.message != "404" && d.message.person !== null) {
                var contact = d.message.person;

                var clearbit_html =
                    `<div class="person-resource">
                    <div class="overview">
                ${contact.avatar !== null ?
                        `<div class="image-component-root">
                        <img src="${contact.avatar}" class=" image-component">
                        </div>`: ''}
                ${((contact.name.fullName && contact.employment) !== null) ?
                        `<div>
                        <h2><strong class="value ellipsis-overflow">${contact.name.fullName}</strong>
                    ${(contact.employment.title !== null) ? `<br> <small>${contact.employment.title}</small>` : ''}
                    ${(contact.employment.name !== null) ? `<br> <small>${contact.employment.name}</small>` : ''}
                        </h2>
                    </div>`: ''}`;
                clearbit_html += `</div>
                <div class="row data">
                    <div class="col-md-6 personal-data">
                        <ul class="title-value-component">`;
                if (contact.name.fullName) {
                    clearbit_html += `<li>
                                <h4 class="title"><i class="fa fa-user" aria-hidden="true"></i> Name</h4>
                                <p class="value">${contact.name.fullName}</p>
                            </li>`;
                }
                if (contact.bio) {
                    clearbit_html += `<li>
                                <h4 class="title"><i class="fa fa-info" aria-hidden="true"></i> Bio</h4>
                                <p class="value">${contact.bio}</p>
                            </li>`;
                }
                if (contact.email) {
                    clearbit_html += `<li class="link">
                                <h4 class="title"><i class="fa fa-envelope-o" aria-hidden="true" style="color: #e94134;"></i> Email</h4>
                                <p class="value link">
                                    <a href="mailto:${contact.email}" title="${contact.email}"
                                        class="ellipsis-overflow">${contact.email}</a>
                                </p>
                            </li>`;
                }
                if (contact.employment.role) {
                    clearbit_html += `<li>
                                <h4 class="title"><i class="fa fa-quote-left" aria-hidden="true"></i> Role</h4>
                                <p class="value cap">${contact.employment.role}</p>
                            </li>`;
                }
                if (contact.employment.seniority) {
                    clearbit_html += `<li>
                                <h4 class="title"><i class="fa fa-users" aria-hidden="true"></i> Seniority</h4>
                                <p class="value cap">${contact.employment.seniority}</p>
                            </li>`;
                }
                if (contact.location) {
                    clearbit_html += `<li>
                                <h4 class="title"><i class="fa fa-globe" aria-hidden="true" style="color: #93b8d1;"></i> Location</h4>
                                <p class="value">${contact.location}</p>
                            </li>`;
                }
                clearbit_html += `</ul>
                    </div>
                    <div class="col-md-6 social-data">
                        <ul class="title-value-component">`;
                if (contact.site) {
                    clearbit_html += `<li class="link">
                                <h4 class="title"><i class="fa fa-paper-plane" aria-hidden="true"></i> Site</h4>
                                <p class="value link">
                                    <a href="${contact.site}" title="${contact.site}"
                                        class="ellipsis-overflow">${contact.site}</a>
                                </p>
                            </li>`;
                }
                if (contact.github.handle) {
                    clearbit_html += `<li class="link" data-toggle="tooltip" title="Hi Kuber">
                                <h4 class="title"><i class="fa fa-github" aria-hidden="true"></i> Github</h4>
                                <p class="value link">
                                    <a href="https://github.com/${contact.github.handle}"
                                        title="https://github.com/${contact.github.handle}"
                                        class="ellipsis-overflow">github.com/${contact.github.handle}</a>
                                </p>
                            </li>`;
                }
                if (contact.twitter.handle) {
                    clearbit_html += `<li class="link" data-toggle="tooltip" title="Hi Kuber">
                                <h4 class="title"><i class="fa fa-twitter" aria-hidden="true" style="color: rgba(29,161,242,1.00);"></i> Twitter</h4>
                                <p class="value link">
                                    <a href="https://twitter.com/${contact.twitter.handle}"
                                        title="https://twitter.com/${contact.twitter.handle}"
                                        class="ellipsis-overflow">twitter.com/${contact.twitter.handle}</a>
                                </p>
                            </li>`;
                }
                if (contact.facebook.handle) {
                    clearbit_html += `<li class="link">
                                <h4 class="title"><i class="fa fa-facebook" aria-hidden="true" style="color: #1778f2;"></i> Facebook</h4>
                                <p class="value link">
                                    <a href="https://facebook.com/${contact.facebook.handle}"
                                        title="https://facebook.com/${contact.facebook.handle}"
                                        class="ellipsis-overflow">facebook.com/${contact.facebook.handle}</a>
                                </p>
                            </li>`;
                }
                if (contact.linkedin.handle) {
                    clearbit_html += `<li class="link">
                                <h4 class="title"><i class="fa fa-linkedin-square" aria-hidden="true" style="color: #0073b1;"></i> LinkedIn</h4>
                                <p class="value link">
                                    <a href="https://linkedin.com/${contact.linkedin.handle}"
                                        title="https://linkedin.com/${contact.linkedin.handle}"
                                        class="ellipsis-overflow">linkedin.com/${contact.linkedin.handle}</a>
                                </p>
                            </li>`;
                }
                clearbit_html += `</ul>
                    </div>
                </div>
            </div >

                <style>
                    .cap {
                        text-transform: capitalize;
                }

                .overview {
                    padding: 20px;
                    align-items: center;
                    display: flex;
                    flex-direction: row;
                }

                .image-component {
                    height: 160px;
                    width: auto;
                    border-radius: 24px;
                }

                .person-resource h2 {
                    flex: 1 1 auto;
                    font-weight: 400;
                    font-size: 21px;
                    line-height: 32px;
                    padding: 9px 0;
                    color: #a7a9ac;
                    margin: 0 0 0 20px;
                    min-width: 0;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }

                .overview h2 strong {
                    font-weight: 400;
                    color: #222426;
                }

                ul.title-value-component {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                .data {
                    display: -webkit-flex;
                    display: flex;
                    padding: 10px;
                }

                .personal-data {
                    -webkit-flex: 1 1 auto;
                    -moz-flex: 1 1 auto;
                    -o-flex: 1 1 auto;
                    -ms-flex: 1 1 auto;
                    flex: 1 1 auto;
                }

                ul.title-value-component li {
                        display: block;
                    position: relative;
                }

                ul.title-value-component h4.title {
                    font-size: 13px;
                    font-weight: 600;
                    color: #222426;
                }

                ul.title-value-component p.value {
                    font-size: 14px;
                    font-weight: 400;
                    color: #68727d;
                }

                .person-resource .data .social-data {
                    -webkit-flex: 1 1 auto;
                    -moz-flex: 1 1 auto;
                    -o-flex: 1 1 auto;
                    -ms-flex: 1 1 auto;
                    flex: 1 1 auto;
                }
            </style>
            <script>
                $(document).ready(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                });
            </script>`;

                frappe.msgprint({
                    title: __('HashXplore'),
                    message: __(clearbit_html)
                }).$wrapper.find('.msgprint-dialog').css("max-width", "100%");
            }
            else {
                frappe.msgprint(_404, HashXplore);
            }
        }
    });
}

frappe.ui.form.on('Lead', {
    refresh(frm) {
        frm.add_custom_button("HashXplore", () => {
            if (!frm.doc.email_id) { frappe.msgprint(fillEmail, HashXplore); }
            else { hashXplore(frm); }
        });
    }
});