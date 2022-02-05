# How to convert HTML to a Canvas module

The task here is design how HTML would be converted into a Canvas module. The requirement is that there be two modes:

1. Test conversion - which is able to describe what the resulting module would look like, without creating it.
2. Creation - actually creating the converted module.

## Basic Premise

Initial conversion

- a module consists of multiple items
- h1 elements break HTML into matching items
- the class associated with the h1 element suggests the type of item in Canvas
- the content of the h1 element becomes the title of the item
- all the HTML until the next h1 becomes the content for the item

Questions

- If and how to do anything about indented items

## Rough design

Module object

- some config info
- title
- items

Items object

- title
- content
- type

- select all h1s to identify items
- use [nextUntil](https://vanillajstoolkit.com/helpers/nextuntil/) to identify the content

## Process

1. Break HTML into items and identify - this is the structure the view will represent
   - Use the module/module item structure from canvas-collections??
2. Use that structure

## Canvas API

Looks like the API requires you create the item first and then provide the id when you add an item to a module

### [Modules](https://canvas.instructure.com/doc/api/modules.html)

- List modules
- Create a module
- Create a module item
- Update a module

- defines the module object - object with defined fields

### Examples

- [E-learning](https://github.com/gqmaguirejr/E-learning) long list of ruby code including apparently create module -- Not useful
- [moduley.py](https://github.com/ucfopen/canvasapi/blob/develop/canvasapi/module.py) Python code for module class, including create_module_item

## Data structures

module_item[type] = File, Page, Discussion, Assignment, Quiz, SubHeader, ExternalUrl, ExternalTool

```html
<!-- start of module div -->
<div
  class="item-group-condensed context_module editable_context_module collapsed_module"
  aria-label="${model.moduleTitle}" data-workflow-state="active" style="">
  <!-- 
  data-module-url="/courses/115/modules/150" data-module-id="n/a"
  id="context_module_150" style="">
      -->
  <a id="c2m_sample_module"></a>

  <!-- start of module title/name div -->
  <div class="ig-header header" id="c2m_sample_module_header">
    <!-- <span class="sortable-handle reorder_module_link"
      title="Drag to reorder modules" style="" >
      <i aria-hidden="true" class="icon-drag-handle"></i>
    </span> -->
    <h2 class="screenreader-only">${model.moduleTitle}</h2>
    <!-- <span role="button" tabindex="0" href="/courses/115/modules/150/collapse"
      class="ig-header-title collapse_module_link ellipsis"
      aria-controls="context_module_content_150" aria-expanded="true"
      aria-label="Misc Module toggle module visibility" title="Misc Module"
      style="display: inline-block;" >
      <i class="icon-mini-arrow-down"></i>
      <span class="name" title="Misc Module">Misc Module</span>
    </span> 
    <span role="button" tabindex="0" href="/courses/115/modules/150/collapse"
      class="ig-header-title expand_module_link ellipsis" aria-controls="context_module_content_150" aria-expanded="false"
      aria-label="Misc Module toggle module visibility" title="Misc Module" style="display: none;" >
      <i class="icon-mini-arrow-right"></i>
      <span class="name ellipsis" title="Misc Module">Misc Module</span>
    </span> -->

    <!-- prerequisites -->

    <div class="prerequisites">
        <!-- need to set/unset display:none as required -->
      <div class="prerequisites_message" title="Prerequisites: " style="display: none;" >
        Prerequisites: <!-- TODO have a mechanism to set this -->
      </div>
    </div>

    <div class="requirements_message"><!-- TODO --></div>

    <!-- module header info -->
    <!-- <div class="ig-header-admin">
      <span data-module-type="module" data-id="150" data-course-id="115" data-published="true"
        data-publishable="true" data-publish-title="Misc Module" title="Published" data-tooltip="" class="publish-icon module published publish-icon-published" role="button" tabindex="0" aria-pressed="true" aria-label="Published.  Click to unpublish Misc Module." ><i class="icon-publish icon-Solid"></i
        ><span class="publish-text" tabindex="-1">&nbsp;Published</span
        ><span class="screenreader-only accessible_label"
          >Published. Click to unpublish Misc Module.</span
        ></span
      >

      <button aria-label="Add Content to Misc Module" rel="/courses/115/modules/150/items" class="add_module_item_link Button--icon-action" >
        <i class="icon-plus"></i><span class="screenreader-only">Add Content to Misc Module</span> 
      </button>

      <button class="Button--icon-action al-trigger" aria-label="Manage Misc Module" >
        <i class="icon-more" aria-hidden="true"></i>
      </button>
      <ul class="al-options">
      </ul>
      <span style="display: none;">
        <span class="name" title="Misc Module">Misc Module</span>
        <span class="id">150</span>
        <span class="publish_final_grade">&nbsp;</span>
        <span class="require_sequential_progress">&nbsp;</span>
      </span> -->
    </div>
  </div>

  <!-- start of the items -->

  <div class="content" id="context_module_content_150" style="display: block;">
    <ul class="ig-list items context_module_items manageable ui-sortable">
      <li id="context_module_item_1078" style="" class="context_module_item          external_url          indent_0          _requirement     ExternalUrl_0" >
        <div class="ig-row   ">
          <a aria-label="Collaborate Ultra: Other Supports" tabindex="-1" class="for-nvda" href="/courses/115/modules/items/1078" >
            Collaborate Ultra: Other Supports
          </a>

          <!--  draggable icon
            <div aria-hidden="true" class="ig-handle">
            <span
              class="draggable-handle move_item_link"
              title="Drag to reorder or move item to another module"
            >
              <i class="icon-drag-handle" aria-hidden="true"></i>
            </span>
          </div> -->

          <!-- the type icon - keep, but maybe add tooltip?? -->
          <span class="type_icon" title="External Url" role="none">
            <span class="screenreader-only">TODO TYPE External Url</span>
            <span class="ig-type-icon">
              <i class="icon-document"></i>
              <i class="icon-paperclip"></i>
              <i class="icon-discussion"></i>
              <i class="icon-assignment"></i>
              <i class="icon-quiz"></i>
              <i class="icon-quiz icon-Solid"></i>
              <i class="icon-link"></i>  <!-- it seems to do something here -->
 <!--             <img id="mc_icon" src="/images/icons/mc_icon_unpub.svg" alt="Mastery Connect" style="display: none; width: 1rem; height: 1rem;" /> -->
            </span>
          </span>

          <div class="ig-info">
            <div class="module-item-title">
              <span class="item_name">
                <a title="${item.title}" class="ig-title title item_link">
                  ${item.title} 
                </a>
                <span title="{item.title}" class="title locked_title">
                  ${item.title}
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
          <!-- <div class="ig-admin">
          </div> -->
        </div>
      </li>

    </ul>

  </div>
</div>
```
