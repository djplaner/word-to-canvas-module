/**
 * c2m_ModuleView.js
 * Convert an internal "Canvas modules" data structure into an approximation
 * of the Canvas module view
 * 
 */
import { c2m_View } from '../c2m_View.js';


export default class c2m_ModuleView extends c2m_View {


	constructor(model, controller) {
		super(model,controller);
	}

	/**
	 * Render the view as a string to be included via another view
	 */

	renderString() {
		const name = this.model.name;
		const items = this.model.items;
/*		return `
			<h4>${this.model.moduleTitle}</h4>

			<p>With ${this.model.moduleItems.length} items</p>
			`; */
        return `
		<p class="text-warning">
		<i class="icon-Solid icon-warning" aria-hidden="true"></i> Still
		under construction. Doesn't distinguish between different item types.
		</p>

<div class="item-group-container">
<div class="ig-list ui-sortable"> <!-- overall list of modules (1 here) div -->

<!-- start of module div -->
<div class="item-group-condensed context_module"
  aria-label="${name}" data-workflow-state="active" style="">
  <a id="c2m_sample_module"></a>

  <!-- start of module title/name div -->
  <div class="ig-header header" id="c2m_sample_module_header">
    <h2 class="screenreader-only">${name}</h2>
	<span class="name" title="${name}">${name}</span>

    <!-- prerequisites -->

    <div class="prerequisites">
        <!-- need to set/unset display:none as required -->
      <div class="prerequisites_message" title="Prerequisites: " style="display: none;" >
        Prerequisites: <!-- TODO have a mechanism to set this -->
      </div>
    </div>

    <div class="requirements_message"><!-- TODO --></div>

  </div>

<!-- add the items -->
    <!-- start of the items -->

  <div class="content" id="context_module_content_150" style="display: block;">
    <ul class="ig-list items context_module_items manageable ui-sortable">

  ${items.map(item => `
      <li id="${item.title}" style="" class="context_module_item external_url">
        <div class="ig-row">
          <a aria-label="${item.title}" tabindex="-1" class="for-nvda">
		    ${item.title}
          </a>

          <div aria-hidden="true" class="ig-handle">
            <span
              class="draggable-handle move_item_link"
              title="Drag to reorder or move item to another module"
            >
              <i class="icon-drag-handle" aria-hidden="true"></i>
            </span>
          </div> 

          <!-- the type icon - keep, but maybe add tooltip?? -->
          <span class="type_icon" title="External Url" role="none">
		  <!-- TODO somethign for screen reader -->
            <span class="screenreader-only"></span>
            <span class="ig-type-icon">
              <i class="icon-document"></i>
              <i class="icon-paperclip"></i>
              <i class="icon-discussion"></i>
              <i class="icon-assignment"></i>
              <i class="icon-quiz"></i>
              <i class="icon-quiz icon-Solid"></i>
              <i class="icon-link"></i>  
-             <img id="mc_icon" src="/images/icons/mc_icon_unpub.svg" alt="Mastery Connect" style="display: none; width: 1rem; height: 1rem;" /> 
            </span>
          </span>

          <div class="ig-info">
            <div class="module-item-title">
              <span class="item_name">
                <a title="${item.title}" class="ig-title title item_link">
                  ${item.title} 
                </a>
                <span title="{item.title}" class="title locked_title">
                  ${item.title} - (${item.type})
                  </span>
                <span class="points_possible" style="display: none;">TODO</span>
                <span class="requirement" style="display: none;">TODO</span>
                <span class="completion_requirement" style="display: none;">TODO</span>
                <span class="position" style="display: none;">2</span>
                <!-- TODO this is the URL for the actual external link -->
                <span class="url" style="display: none;">TODO</span>
                <span class="new_tab" style="display: none;">0</span>
              </span>
            </div>

            <div class="module_item_icons nobr">
              <!-- dead code? -->
              <span class="criterion ">
                <span class="min_score" style="display: none;">&nbsp;</span>
                <span class="criterion_type" style="display: none;" >&nbsp;</span >
              </span>
              <!-- /dead code -->
              <span class="type" style="display: none;">external_url</span>
              <span class="id" style="display: none;">1078</span>
              <span class="graded" style="display: none;">0</span>
            </div>

            <div class="ig-details">
              <div class="requirement-description ig-details__item">
                <span class="completion_requirement">
                  <span class="requirement_type min_score_requirement">
                    <span class="unfulfilled">
                      Score at least <span class="min_score">&nbsp;</span>
                      <span class="screenreader-only" >Must score at least
                        <span class="min_score">&nbsp;</span> to complete this
                        module item</span
                      >
                    </span>
                    <span class="fulfilled">
                      Scored at least <span class="min_score">&nbsp;</span>
                      <span class="screenreader-only"
                        >Module item has been completed by scoring at least
                        <span class="min_score">&nbsp;</span></span >
                    </span>
                  </span>
                  <span class="requirement_type must_view_requirement">
                    <span class="unfulfilled">
                      View
                      <span class="screenreader-only"
                        >Must view in order to complete this module item</span
                      >
                    </span>
                    <span class="fulfilled">
                      Viewed
                      <span class="screenreader-only"
                        >Module item has been viewed and is complete</span
                      >
                    </span>
                  </span>
                  <span class="requirement_type must_mark_done_requirement">
                    <span class="unfulfilled">
                      Mark as done
                      <span class="screenreader-only"
                        >Must mark this module item done in order to
                        complete</span
                      >
                    </span>
                    <span class="fulfilled">
                      Marked as done
                      <span class="screenreader-only"
                        >Module item marked as done and is complete</span
                      >
                    </span>
                  </span>
                  <span class="requirement_type must_contribute_requirement">
                    <span class="unfulfilled">
                      Contribute
                      <span class="screenreader-only"
                        >Must contribute to this module item to complete
                        it</span
                      >
                    </span>
                    <span class="fulfilled">
                      Contributed
                      <span class="screenreader-only"
                        >Contributed to this module item and is complete</span
                      >
                    </span>
                  </span>
                  <span class="requirement_type must_submit_requirement">
                    <span class="unfulfilled">
                      Submit
                      <span class="screenreader-only"
                        >Must submit this module item to complete it</span
                      >
                    </span>
                    <span class="fulfilled">
                      Submitted
                      <span class="screenreader-only"
                        >Module item submitted and is complete</span
                      >
                    </span>
                  </span>
                </span>
              </div>
              <!-- requirement description end -->
            </div>
          </div>
          <div class="ig-admin">
          </div> 
        </div>
      </li>


  `.trim()).join("")}
    </ul>
	<div class="footer"></div>
	</div>
</div>
</div>
  `;
	}
}